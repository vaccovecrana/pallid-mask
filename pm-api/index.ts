import * as express from "express"

const app = express()
const port = 3000
const contentPath = process.env.NODE_ENV === "production" ? "." : "build"

app.get("/", (req, res) => res.send(`
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  </head>
  <style></style>
  <body>
    <script src="ui.js"></script>
  </body>
</html>
`))

app.use(express.static(contentPath))
app.listen(port, () => console.log(`Api started on port [${port}]`))
