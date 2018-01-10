'use strict';
const photoCategories = [ 'TFP','Fashion','Свадебная','Детская и семейная', 'Праздники', 'Концерты и вечеринки',
  'Персональная', 'Love Story', 'Коммерческая','Интерьерная','Предметная','Другие' ];
module.exports = (sequelize, DataTypes) => {
  let PhotoOffer = sequelize.define('PhotoOffer', {
    category: {
      type: DataTypes.ENUM(photoCategories),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    portfolioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  PhotoOffer.associate = function(models) {
    PhotoOffer.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    PhotoOffer.belongsTo(models.Portfolio, {foreignKey: 'portfolioId', as: 'portfolio'});
    PhotoOffer.addScope('defaultScope',
      {
        include: [ {
          model: models.User,
          as: 'user',
        } ],
      }
      ,{override: true});
  };
  return PhotoOffer;
};
