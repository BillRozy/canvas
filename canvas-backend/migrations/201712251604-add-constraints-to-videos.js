'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      return queryInterface.addConstraint(
        'Videos',
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
        .then(() => {resolve();})
        .catch((err) => reject(err));
    });
  },
  down: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      queryInterface.removeConstraint('Videos', 'userConstraint')
        .then(() => {resolve();})
        .catch((err) => reject(err));
    });
  },
};
