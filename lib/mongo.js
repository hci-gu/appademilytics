const { MongoClient } = require('mongodb')

const {
  MONGO_HOST = 'localhost:27017',
  MONGO_USERNAME = 'username',
  MONGO_PASSWORD = 'password',
} = process.env

const client = new MongoClient(
  `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
)

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
