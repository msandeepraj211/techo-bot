'use strict';

const MongoClient = require('mongodb').MongoClient,
    //   connectionString = 'mongodb://frontenduser:neDA86x9@ds151731-a1.mlab.com:51731/publishprod?readPreference=secondaryPreferred',
      connectionString = 'mongodb://username:password@ds035336.mlab.com:35333/your-database-nam',
      Boom = require('boom');

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
  static saveData(make) {
    return Data.allModels()
      .then((models) => {
        return models.filter((m) => (m.make === make && m.is_hidden === false && m.is_in_navigation === true));
      })
      .catch((err) => {
        console.error('ERR:', err);
        throw Boom.badRequest(`Failed querying mongo: ${err.message}`);
      });
  }

  static getData() {
    return Data.allMakes()
      .then((makes) => {
        return makes;
      })
      .catch((err) => {
        console.error('ERR:', err);
        throw Boom.badRequest(`Failed querying mongo: ${err.message}`);
      });
  }
}

module.exports = Data;