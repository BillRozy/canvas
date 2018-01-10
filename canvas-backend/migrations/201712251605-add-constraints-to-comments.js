'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      return queryInterface.addConstraint(
        'Comments',
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
            'Comments',
            [ 'portfolioId' ],
            {
              type: 'FOREIGN KEY',
              name: 'portfolioConstraint',
              references: { // Required field
                table: 'Portfolios',
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
      queryInterface.removeConstraint('Comments', 'userConstraint')
        .then(() => {
          return queryInterface.removeConstraint('Comments', 'portfolioConstraint');
        })
        .then(() => {resolve();})
        .catch((err) => reject(err));
    });
  },
};
