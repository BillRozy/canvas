'use strict';
module.exports = (sequelize, DataTypes) => {
  let video_offer = sequelize.define('video_offer', {
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
  video_offer.associate = function(models) {
    video_offer.belongsTo(models.user);
  };
  return video_offer;
};
