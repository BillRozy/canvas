'use strict';
const videoCategories = [ 'Клипы', 'Творческие', 'Свадьбы', 'Праздники', 'Вечеринки', 'Love story', 'Коммерческие', 'Другие', 'Motion Design' ];
module.exports = (sequelize, DataTypes) => {
  let VideoOffer = sequelize.define('VideoOffer', {
    category: {
      type: DataTypes.ENUM(videoCategories),
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
  VideoOffer.associate = function(models) {
    VideoOffer.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    VideoOffer.belongsTo(models.Portfolio, {foreignKey: 'portfolioId', as: 'portfolio'});
  };
  return VideoOffer;
};
