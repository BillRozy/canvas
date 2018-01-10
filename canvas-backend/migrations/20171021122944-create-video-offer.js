'use strict';
const videoCategories = [ 'Клипы', 'Творческие', 'Свадьбы', 'Праздники', 'Вечеринки', 'Love story', 'Коммерческие', 'Другие', 'Motion Design' ];
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('VideoOffers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: videoCategories,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      portfolioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Portfolios',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('videoOffers');
  },
};
