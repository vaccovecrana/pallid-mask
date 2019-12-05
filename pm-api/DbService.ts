import * as fs from "fs"
import * as low from "lowdb"
import * as FileSync from "lowdb/adapters/FileSync"

import {PmCertificateAuthority, PmDbSchema} from "pm-schema"

class DbService {

  private db: low.LowdbSync<PmDbSchema>

  constructor() {
    this.db = low(new FileSync("database.json"))
    this.db.defaults({cas: {}})
  }

  public readSchemaData() {
    return fs.readFileSync("database.json", "utf8").toString()
  }

  public loadCa(caId: string): PmCertificateAuthority {
    return this.db.get("cas").find({id: caId}).value()
  }

  public update(ca: PmCertificateAuthority) {
    this.db.set(`cas.${ca.id}`, ca).write()
  }
}

export default new DbService()
