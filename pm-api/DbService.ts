import * as low from "lowdb"
import * as FileSync from "lowdb/adapters/FileSync"
import {PmDbSchema} from "pm-schema"

class DbService {
  public db: low.LowdbSync<PmDbSchema>
  constructor() {
    this.db = low(new FileSync("database.json"))
    this.db.defaults({cas: {}})
  }
}

export default new DbService()
