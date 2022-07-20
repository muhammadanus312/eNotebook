const dbConnect=require('./db')
const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())
const port = 5000
dbConnect()

app.use(express.json())
// routes
app.use('/api/authentication',require('./Routes/authentication'))
app.use('/api/notes',require('./Routes/notes'))
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// console.log("hello")