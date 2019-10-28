const express = require('express')
const body_parser = require('body-parser')
const { Connection } = require('./database')
const app = express()
const port = 1000

app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

app.get('/api/', (req, res) => res.send('test'))
app.use('/api/auth/', require('./routes/auth'))

app.listen(port, () => {
  console.log(`listening on port ${port}!`)
  Connection.connectDatabase()
})