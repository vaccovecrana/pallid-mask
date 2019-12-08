import * as fs from "fs"
import * as os from "os"
import * as path from "path"
import * as pino from "pino"

export const tempFile = (name = "temp_file", data = "", encoding = "utf8"): Promise<string> => {
  return new Promise((resolve, reject) => {
    const tempPath = path.join(os.tmpdir(), "pmtmp-")
    fs.mkdtemp(tempPath, (err, folder) => {
      if (err) { return reject(err) }
      const fileName = path.join(folder, name)
      fs.writeFile(fileName, data, encoding,
        (errorFile) => errorFile ? reject(errorFile) : resolve(fileName))
    })
  })
}

export const logger = (name: string) => pino({name,
  level: process.env.NODE_ENV === "development" ? "debug" : "info"
})

export const config = {
  dbFile: path.resolve(process.env.PM_DB_FILE || "./database.json"),
  port: process.env.PM_HTTP_PORT || 3000
}
