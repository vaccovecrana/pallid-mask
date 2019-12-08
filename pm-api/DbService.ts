import * as fs from "fs"
import * as low from "lowdb"
import * as FileSync from "lowdb/adapters/FileSync"
import * as tar from "tar"

import {config, tempFile} from "pm-api/util"
import {PmDbSchema, PmIdentity} from "pm-schema"

class DbService {

  private db: low.LowdbSync<PmDbSchema>

  constructor() {
    this.db = low(new FileSync(config.dbFile))
    this.db.defaults({idn: {}})
  }

  public readSchemaData() {
    return fs.readFileSync(config.dbFile, "utf8").toString()
  }

  public loadIdentity(idnId: string): PmIdentity {
    return this.db.get("idn").find({id: idnId}).value()
  }

  public update(idn: PmIdentity) {
    this.db.set(`idn.${idn.id}`, idn).write()
  }

  public bundleFor(idnId: string): Promise<string> {
    const idn = this.loadIdentity(idnId)
    const certIdx = new Map<string, string>()
    let pIdnId = idn.issuerId

    certIdx.set(idnId, idn.certificate.cert)
    while (pIdnId) {
      const pIdn = this.loadIdentity(pIdnId)
      certIdx.set(pIdnId, pIdn.certificate.cert)
      pIdnId = pIdn.issuerId
    }

    return new Promise((resolve, reject) => {
      tempFile(`${idnId}.tar`).then((outPath) => {
        const certs = [...certIdx.values()]
        const certBundle: string = certs.reduce((cert0, cert1) => `${cert0}${cert1}`)
        Promise.all([
          tempFile(`${idn.csrMetadata.CN}-bundle.pem`, certBundle),
          tempFile(`${idn.csrMetadata.CN}-key.pem`, idn.certificate.key)]
        ).then((files) =>
          tar.c({gzip: true, file: outPath}, files)
        ).then(() => resolve(outPath))
      }).catch((err) => reject(err))
    })
  }
}

export default new DbService()
