const Log =  require('../logger');

const cfg = {
  "development": {
    "dialect": "sqlite",
    "database": "development",
    "logging": (msg) => Log.info(msg),
    "storage": "./db/development.db"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "pg"
  },
  "production": {
    "dialect": "sqlite",
    "database": "production",
    "logging": (msg) => Log.info(msg),
    "storage": "./db/production.db"
  }
};

module.exports = cfg;
