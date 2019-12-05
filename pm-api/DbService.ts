import * as fs from "fs"
import * as low from "lowdb"
import * as FileSync from "lowdb/adapters/FileSync"

import {PmDbSchema, PmIdentity} from "pm-schema"

class DbService {

  private db: low.LowdbSync<PmDbSchema>

  constructor() {
    this.db = low(new FileSync("database.json"))
    this.db.defaults({idn: {}})
  }

  public readSchemaData() {
    return fs.readFileSync("database.json", "utf8").toString()
  }

  public loadCa(caId: string): PmIdentity {
    return this.db.get("idn").find({id: caId}).value()
  }

  public update(idn: PmIdentity) {
    this.db.set(`idn.${idn.id}`, idn).write()
  }
}

export default new DbService()
