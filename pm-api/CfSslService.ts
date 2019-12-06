import {ASN1, PEM} from "@fidm/asn1"
import {spawn} from "child_process"
import {StringBuilder} from "typescript-string-operations"

import {logger, tempFile} from "pm-api/util"
import {PmEncodedCertResponse, PmIdentity} from "pm-schema"
import {CertificateRequest} from "pm-schema/csr"

const log = logger("CfSSLService")

const procSpawn = (executable: string, cmdArgs: string[]): Promise<string> => {
  log.debug(JSON.stringify(cmdArgs, null, 2))
  return new Promise((resolve, reject) => {
    const buffer = new StringBuilder()
    const proc = spawn(executable, cmdArgs)
    proc.stdout.on("data", (chunk) => resolve(chunk.toString()))
    proc.stderr.on("data", (chunk) => buffer.Append(chunk.toString()))
    proc.on("error", (err) => reject({msg: "Unknown error", err}))
    proc.on("exit", (code) => code !== 0 ? reject({msg: buffer.Values}) : {})
  })
}

class CfSslService {

  public initRootCa(csr: CertificateRequest): Promise<PmEncodedCertResponse> {
    return tempFile("ca_csr", JSON.stringify(csr))
      .then((path) => procSpawn("cfssl", ["gencert", "-initca", path]))
      .then((stdOut) => JSON.parse(stdOut) as PmEncodedCertResponse)
      .then((res) => ({...res, isCa: true}))
  }

  public isCa(csrRes: PmEncodedCertResponse) {
    const pems = PEM.parse(Buffer.from(csrRes.cert, "utf-8"))
    const asn1 = ASN1.fromDER(pems[0].body)
    const keyUsage = asn1.value[0].value[7].value[0].value[1].value[2].value as Buffer
    if (keyUsage.length >= 4) {
      const b0 = keyUsage.readInt8(2)
      const b1 = keyUsage.readInt8(3)
      return b0 === 1 && b1 === 1
    }
    return false
  }

  public initIntCa(csr: CertificateRequest, issuer: PmIdentity, profileTag: string): Promise<PmEncodedCertResponse> {
    const pcaConfigTxt = JSON.stringify(issuer.signingConfig)
    return tempFile("intca_csr", JSON.stringify(csr))
      .then((intCaCsr) => procSpawn("cfssl", ["genkey", "-initca", intCaCsr])
        .then((bundle0) => {
          const bundle = JSON.parse(bundle0) as PmEncodedCertResponse
          return Promise.all([Promise.resolve(bundle), tempFile("intca_csr_pem", bundle.csr)])
        })
      ).then(([bundle, intCaCsrPem]) => Promise.all([
        Promise.resolve(bundle),
        Promise.resolve(intCaCsrPem),
        tempFile("pca_cert", issuer.certificate.cert),
        tempFile("pca_key", issuer.certificate.key),
        tempFile("pca_config", pcaConfigTxt)
      ])).then(([bundle, intCaCsrPem, pcaCert, pcaKey, pcaConfig]) => Promise.all([
        Promise.resolve(bundle), procSpawn("cfssl", [
          "sign", "-ca", pcaCert, "-ca-key", pcaKey,
          "--config", pcaConfig, "-profile", profileTag, intCaCsrPem
        ])
      ])).then(([bundle, result]) => {
        const signedBundle: PmEncodedCertResponse = JSON.parse(result)
        bundle.cert = signedBundle.cert
        bundle.isCa = this.isCa(bundle)
        return bundle
      })
  }

  public initIdentity(csr: CertificateRequest, issuer: PmIdentity, profileTag: string): Promise<PmEncodedCertResponse> {
    const issConfig = JSON.stringify(issuer.signingConfig)
    return Promise.all([
      tempFile("ident_csr", JSON.stringify(csr)),
      tempFile("pca_cert", issuer.certificate.cert),
      tempFile("pca_key", issuer.certificate.key),
      tempFile("pca_config", issConfig)
    ]).then(([identCsr, pcaCert, pcaKey, pcaConfig]) => procSpawn("cfssl", [
      "gencert", "-ca", pcaCert, "-ca-key", pcaKey, "-config",
      pcaConfig, "-profile", profileTag, identCsr
    ])).then((result) => JSON.parse(result) as PmEncodedCertResponse)
  }
}

export default new CfSslService()
