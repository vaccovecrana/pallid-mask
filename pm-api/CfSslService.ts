import {spawn} from "child_process"
import {StringBuilder } from "typescript-string-operations"

import {logger, tempFile} from "pm-api/util"
import {PmEncodedCertResponse} from "pm-schema"
import {CertificateRequest} from "pm-schema/csr"

const log = logger("CfSSLService")

class CfSslService {

  public initCaProc(csr: CertificateRequest): Promise<PmEncodedCertResponse> {
    return new Promise((resolve, reject) => {
      tempFile("ca_csr", JSON.stringify(csr)).then((path) => {
        const cmdArgs = ["gencert", "-initca", path]
        log.debug(JSON.stringify(cmdArgs))
        const buffer = new StringBuilder()
        const proc = spawn("cfssl", cmdArgs)
        proc.stdout.on("data", (chunk) => {
          const certMeta = JSON.parse(chunk.toString()) as PmEncodedCertResponse
          resolve(certMeta)
        })
        proc.stderr.on("data", (chunk) => buffer.Append(chunk.toString()))
        proc.on("error", (err) => reject({msg: "Unknown error", err}))
        proc.on("exit", (code) => code !== 0 ? reject({msg: buffer.Values}) : {})
      })
    })
  }
}

export default new CfSslService
