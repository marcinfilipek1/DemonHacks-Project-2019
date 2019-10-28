//https://stackoverflow.com/questions/49397608/what-is-best-way-to-handle-global-connection-of-mongodb-in-nodejs
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://127.0.0.1:27017'
const db_name = 'demonhacks'

class Connection {
  static connectDatabase() {
    if ( this.db ) return Promise.resolve(this.db)
    return MongoClient.connect(this.url, this.options)
      .then(db => {
        this.db = db.db(db_name)
        console.log('connected database!')
      })
  }
}

Connection.db = null
Connection.url = url
Connection.options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}

module.exports ={ Connection }
