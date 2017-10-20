const bcrypt = require('bcrypt');
const Log = require('../logger');
const config = require('../config/secure-config');

function hashPassword(password) {
  Log.debug('hashing');
  return new Promise((resolve,reject) => {
    bcrypt.hash(password, config.saltRounds, function(err, hash) {
      Log.debug('after hash');
      if (err) {
        Log.debug(err);
        reject(err);
      } else {
        Log.debug(hash);
        resolve(hash);
      }
    });
  });
}

function verifyPassword(password, secondPassword) {
  return new Promise((resolve,reject) => {
    bcrypt.compare(password, secondPassword, function(err, res) {
      if (res) {
        resolve(true);
        // Passwords match
      } else {
        resolve(false);
        // Passwords don't match
      }
    });
  });
}

module.exports = {
  hashPassword,
  verifyPassword,
};
