'use strict';
const photoCategories = [ 'TFP','Fashion','Свадебная','Детская и семейная', 'Праздники', 'Концерты и вечеринки',
  'Персональная', 'Love Story', 'Коммерческая','Интерьерная','Предметная','Другие' ];
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PhotoOffers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: photoCategories,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('photoOffers');
  },
};
