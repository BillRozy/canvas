'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('UserRoles',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          },
          allowNull: false,
        },
        roleId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Roles',
            key: 'id',
          },
          allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      });
  },
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('UserRoles');
  },
};
