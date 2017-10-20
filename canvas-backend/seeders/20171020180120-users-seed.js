'use strict';
const SecureHelp = require('../helpers/security');
const Log = require('../logger');
const bcrypt = require('bcrypt');
const config = require('../config/secure-config');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('users', [ {
      username: 'BillRozy',
      password: bcrypt.hashSync('4607020a', config.saltRounds),
      createdAt: new Date(),
      updatedAt: new Date(),
    } ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('users', null, {});
  },
};
