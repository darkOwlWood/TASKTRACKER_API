const { MongoClient } = require('mongodb');
const { config } = require('../config');

const USER     = config.dbUser;
const PASSWORD = config.dbPassword;
const HOST     = config.dbHost;
const DB       = config.dbName;

const MONGO_URI = config.dev ? `mongodb://${HOST}/${DB}` : `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB}`;

class MongoLib {
    constructor() {
        this.db = DB;
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) {
                        console.error(err);
                        reject(err);
                        return;
                    }
                    resolve(this.client.db(this.db));
                })
            });
        }
        return MongoLib.connection;
    }

    select(collection, query) {
        return this.connect()
            .then(db => {
                return db
                    .collection(collection)
                    .find(query)
                    .toArray();
            });
    }

    insert(collection, data) {
        return this.connect()
            .then(db => {
                return db
                    .collection(collection)
                    .insertOne(data);
            })
            .then(result => result.insertedId);
    }

    update(collection, query, data) {
        return this.connect()
            .then(db => {
                return db
                    .collection(collection)
                    .updateOne(query, data)
            })
            .then(result => result.modifiedCount);
    }

    delete(collection, query) {
        return this.connect()
            .then(db => {
                return db
                    .collection(collection)
                    .deleteOne(query)
            })
            .then(result => result.deletedCount);
    }
}

module.exports = MongoLib;