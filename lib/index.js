require('dotenv').config()
const express = require('express')
const mongo = require('./mongo')
mongo.init()

const app = express()
app.use(express.json())

app.get('/', async (_, res) => {
  const dbs = await mongo.listDbs()
  res.json(dbs)
})

app.post('/db', async (req, res) => {
  const db = mongo.createDatabase(req.body.name)

  console.log(db)
  res.send('OK')
})

app.post('/:db/:collection/data', async (req, res) => {
  const { db, collection } = req.params

  const result = await mongo.save(db, collection, req.body)
  res.send(result)
})

app.get('/:db/:collection/data', async (req, res) => {
  const { db, collection } = req.params

  const result = await mongo.find(db, collection, req.query)
  res.send(result)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
