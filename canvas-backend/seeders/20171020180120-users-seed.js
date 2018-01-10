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
      const roleAdmin = yield models.Role.create(
        {
          title: 'ROLE_ADMIN',
        },
        {
          include: [ 'users' ],
        });
      const roleOperator = yield models.Role.create(
        {
          title: 'ROLE_OPERATOR',
        },
        {
          include: [ 'users' ],
        });
      const roleUser = yield models.Role.create(
        {
          title: 'ROLE_USER',
        },
        {
          include: [ 'users' ],
        });
      const user1 = yield models.User.create(
        {
          username: 'BillRozy',
          password: '4607020a',
        },
        {
          include: [ 'roles' ],
        }
      );

      const user2 = yield models.User.create(
        {
          username: 'operator',
          password: '4607020a',
        },
        {
          include: [ 'roles' ],
        }
      );

      const user3 = yield models.User.create(
        {
          username: 'simpleuser',
          password: '4607020a',
        },
        {
          include: [ 'roles' ],
        }
      );
      yield user1.setRoles([ roleAdmin, roleOperator, roleUser ]);
      yield user2.setRoles([ roleOperator, roleUser ]);
      yield user3.setRoles([ roleUser ]);
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
    return queryInterface.bulkDelete('Users', null, {});
  },
};
