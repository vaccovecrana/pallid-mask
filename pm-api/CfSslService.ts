import {spawn} from "child_process"
import {StringBuilder } from "typescript-string-operations"

import {logger, tempFile} from "pm-api/util"
import {PmEncodedCertResponse, PmIdentity} from "pm-schema"
import {CertificateRequest} from "pm-schema/csr"

const log = logger("CfSSLService")

const procSpawn = (executable: string, cmdArgs: string[]): Promise<string> => {
  log.debug(JSON.stringify(cmdArgs))
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
  }

  public initIntCa(csr: CertificateRequest, issuer: PmIdentity, profileTag: string):
    Promise<PmEncodedCertResponse> {
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
        ])).then(([bundle, intCaCsrPem, pcaCert, pcaKey, pcaConfig]) => procSpawn("cfssl", [
          "sign", "-ca", pcaCert, "-ca-key", pcaKey,
          "--config", pcaConfig, "-profile", profileTag, intCaCsrPem
        ])).then((result) => {
          log.info(result)
          return undefined
        })
  }
}

export default new CfSslService()
