import * as fs from "fs"
import * as os from "os"
import * as path from "path"

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
