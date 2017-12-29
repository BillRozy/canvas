'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      return queryInterface.addConstraint(
        'UserRoles',
        [ 'userId' ],
        {
          type: 'FOREIGN KEY',
          name: 'userConstraint',
          references: { // Required field
            table: 'Users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        })
        .then(() => {
          return queryInterface.addConstraint(
            'UserRoles',
            [ 'roleId' ],
            {
              type: 'FOREIGN KEY',
              name: 'roleConstraint',
              references: { // Required field
                table: 'Roles',
                field: 'id',
              },
              onDelete: 'cascade',
              onUpdate: 'cascade',
            }
          );
        })
        .then(() => {resolve();})
        .catch((err) => reject(err));
    });
  },
  down: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      queryInterface.removeConstraint('UserRoles', 'userConstraint')
        .then(() => {
          return queryInterface.removeConstraint('UserRoles', 'roleConstraint');
        })
        .then(() => {resolve();})
        .catch((err) => reject(err));
    });
  },
};
