'use strict';
const Log = require('../logger');
const models = require('../models');
const Promise = require('bluebird');

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
    return Promise.coroutine(function* () {
      const roleAdmin = yield models.role.create(
        {
          title: 'ROLE_ADMIN',
        },
        {
          include: [ 'user' ],
        });
      const roleOperator = yield models.role.create(
        {
          title: 'ROLE_OPERATOR',
        },
        {
          include: [ 'user' ],
        });
      const roleUser = yield models.role.create(
        {
          title: 'ROLE_USER',
        },
        {
          include: [ 'user' ],
        });
      const user1 = yield models.user.create(
        {
          username: 'BillRozy',
          password: '4607020a',
        },
        {
          include: [ 'role' ],
        }
      );

      const user2 = yield models.user.create(
        {
          username: 'operator',
          password: '4607020a',
        },
        {
          include: [ 'role' ],
        }
      );

      const user3 = yield models.user.create(
        {
          username: 'simpleuser',
          password: '4607020a',
        },
        {
          include: [ 'role' ],
        }
      );
      const y1 = yield user1.setRole([ roleAdmin, roleOperator, roleUser ]);
      const y2 = yield user2.setRole([ roleOperator, roleUser ]);
      const y3 = yield user3.setRole([ roleUser ]);
      // user.addRole(role, { through: { userId: user.id, 'roleId': role.id }});
    })().catch(err => Log.error(err));

    // return queryInterface.bulkInsert('users', [ {
    //   username: 'BillRozy',
    //   password: bcrypt.hashSync('4607020a', config.saltRounds),
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // } ], {});

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
