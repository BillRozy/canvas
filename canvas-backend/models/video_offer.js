'use strict';
const videoCategories = [ 'Клипы', 'Творческие', 'Свадьбы', 'Праздники', 'Вечеринки', 'Love story', 'Коммерческие', 'Другие', 'Motion Design' ];
module.exports = (sequelize, DataTypes) => {
  let videoOffer = sequelize.define('videoOffer', {
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
  videoOffer.associate = function(models) {
    videoOffer.belongsTo(models.user);
    videoOffer.belongsTo(models.portfolio);
  };
  return videoOffer;
};
