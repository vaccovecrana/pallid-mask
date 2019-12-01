import * as express from "express"

import cfSslService from "pm-api/CfSSLService"
import dbService from "pm-api/DbService"
import {logger} from "pm-api/util"
import {PmApi, PmCertificateAuthority} from "pm-schema"

const log = logger("api")
const app = express()
const port = 3000
const contentPath = process.env.NODE_ENV === "production" ? "." : "build"

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

app.get(PmApi.v1Schema, (req, res) => {
  res.type("application/json").send(dbService.readSchemaData())
})

app.post(PmApi.v1Ca, (req, res) => {
  const ca = req.body as PmCertificateAuthority
  cfSslService.initCaProc(ca.csrMetadata)
    .then((certificate) => ({...ca, certificate} as PmCertificateAuthority))
    .then((ca1) => {
      dbService.addCa(ca1)
      res.json(ca1)
    }).catch((err) => res.status(500).send(JSON.stringify(err)))
})

app.listen(port, () => log.info(`Api started on port [${port}]`))
