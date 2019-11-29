import * as express from "express"

import dbService from "pm-api/DbService"

const app = express()
const port = 3000
const contentPath = process.env.NODE_ENV === "production" ? "." : "build"

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
  const caList = dbService.db.get("cas").values()
  return res.json(caList)
})

app.use(express.static(contentPath))
app.listen(port, () => console.log(`Api started on port [${port}]`))
