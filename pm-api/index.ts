import * as express from "express"

import cfSslService from "pm-api/CFSSLService"
import dbService from "pm-api/DbService"
import {config, logger} from "pm-api/util"
import {PmApi, PmIdentity, profilesOf} from "pm-schema"

const log = logger("api")
const app = express()
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

const asJsonError = (e: any, res: any) => {
  res.status(500).send(JSON.stringify(e))
}

app.get(PmApi.v1Schema, (req, res) => {
  try {
    res.type("application/json").send(dbService.readSchemaData())
  } catch (error) { asJsonError(error, res) }
})

app.post(PmApi.v1Idn, (req, res) => {
  const idn = req.body as PmIdentity
  if (!idn.issuerId) {
    cfSslService.initRootCa(idn.csrMetadata)
      .then((certificate) => ({...idn, certificate}))
      .then((ca1) => {
        dbService.update(ca1)
        res.json(ca1)
      }).catch((err) => asJsonError(err, res))
  } else {
    const parentIdn = dbService.loadIdentity(idn.issuerId)
    const profile = profilesOf(parentIdn).find((pr0) => pr0.pm_tag === idn.issuerProfileTag)
    if (profile.ca_constraint && profile.ca_constraint.is_ca) {
      cfSslService.initIntCa(idn.csrMetadata, parentIdn, idn.issuerProfileTag)
        .then((certificate) => ({...idn, certificate}))
        .then((ca1) => {
          dbService.update(ca1)
          res.json(ca1)
        }).catch((err) => asJsonError(err, res))
    } else {
      cfSslService.initIdentity(idn.csrMetadata, parentIdn, idn.issuerProfileTag)
        .then((certificate) => ({...idn, certificate}))
        .then((idn1) => {
          dbService.update(idn1)
          res.json(idn1)
        }).catch((err) => asJsonError(err, res))
    }
  }
})

app.put(PmApi.v1Idn, (req, res) => {
  const ca = req.body as PmIdentity
  dbService.update(ca)
  res.json(ca)
})

app.get(PmApi.v1IdnBundle, (req, res) => {
  const {idnId} = req.params
  dbService.bundleFor(idnId).then((bundlePath) => res.download(bundlePath))
})

log.info(`Runtime config:\n${JSON.stringify(config, null, 2)}`)
app.listen(config.port, () => log.info(`Api started on port [${config.port}]`))
