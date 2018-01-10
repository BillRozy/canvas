'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      return queryInterface.addConstraint(
        'PhotoOffers',
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
            'PhotoOffers',
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
      queryInterface.removeConstraint('PhotoOffers', 'userConstraint')
        .then(() => {
          return queryInterface.removeConstraint('PhotoOffers', 'portfolioConstraint');
        })
        .then(() => {resolve();})
        .catch((err) => reject(err));
    });
  },
};
