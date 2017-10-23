'use strict';
module.exports = (sequelize, DataTypes) => {
  let videoOffer = sequelize.define('videoOffer', {
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
  videoOffer.associate = function(models) {
    videoOffer.belongsTo(models.user);
  };
  return videoOffer;
};
