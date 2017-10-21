'use strict';
module.exports = (sequelize, DataTypes) => {
  let photo_offer = sequelize.define('photo_offer', {
    category: {
      type: DataTypes.STRING,
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
  });
  photo_offer.associate = function(models) {
    photo_offer.belongsTo(models.user);
  };
  return photo_offer;
};
