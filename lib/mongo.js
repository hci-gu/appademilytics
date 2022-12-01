const { MongoClient } = require('mongodb')

const url =
  process.env.MONGO_URL || 'mongodb://username:password@localhost:27017'
const client = new MongoClient(url)

module.exports = {
  init: () => client.connect(),
  listDbs: () => client.db().admin().listDatabases(),
  createDatabase: (name) => {
    return client.db(name)
  },
  save: (dbName, collection, data) => {
    return client.db(dbName).collection(collection).insertOne(data)
  },
  find: (dbName, collection, query) => {
    return client.db(dbName).collection(collection).find(query).toArray()
  },
}
