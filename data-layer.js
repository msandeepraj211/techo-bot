'use strict';

const MongoClient = require('mongodb').MongoClient,
  connectionString = 'mongodb://username:password@ds249005.mlab.com:49005/techo-hack-bot';

let dbInstance;

class Data {
  static getDbInstance() {
    return new Promise((resolve, reject) => {
      if (!dbInstance) {
        MongoClient.connect(connectionString).then((db) => {
          dbInstance = db;
          resolve(dbInstance);
        })
        .catch((err) => {
          reject(err);
        });
      } else {
        resolve(dbInstance);
      }
    });
  }

  static getUserDetails(id) {
    return Data.getDbInstance().then((dbInstance) => {
      return dbInstance.collection('users').find({fadeId: id}).toArray()
    });
  }
}

module.exports = Data;