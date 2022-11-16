const express = require('express')
const app = express()
const port = 3000
//tell to serve up public files in the public folder
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`)
})

// app.get('/', (req, res) => {
//   req.
// })

