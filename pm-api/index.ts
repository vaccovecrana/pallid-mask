import {spawn} from "child_process"
import * as express from "express"
import * as pino from "pino"

import dbService from "pm-api/DbService"
import {tempFile} from "pm-api/util"
import {PmCertificateAuthority, PmEncodedCertResponse} from "pm-schema"

const log = pino({name: "api"})
const app = express()
const port = 3000
const contentPath = process.env.NODE_ENV === "production" ? "." : "build"

log.level = "debug"

app.use(express.json())
app.use(express.static(contentPath))

app.get("/", (req, res) => res.send(`
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  </head>
  <body>
    <script src="ui.js"></script>
  </body>
</html>
`))

app.get("/v1/ca", (req, res) => {
  const caList = dbService.listCa()
  return res.json(caList)
})

app.post("/v1/ca", (req, res) => {
  const caMeta = req.body as PmCertificateAuthority
  tempFile("ca_csr", JSON.stringify(caMeta.csrMetadata))
    .then((path) => {
      const cmdArgs = ["gencert", "-initca", path]
      const proc = spawn("cfssl", cmdArgs)
      proc.stdout.on("data", (chunk) => {
        const certMeta = JSON.parse(chunk.toString()) as PmEncodedCertResponse
        caMeta.certificate = certMeta
        dbService.addCa(caMeta)
        res.json(caMeta)
      })
      proc.on("error", (err) => res.json({err}))
    })
})

app.listen(port, () => log.info(`Api started on port [${port}]`))
