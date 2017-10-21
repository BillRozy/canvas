'use strict';
module.exports = (sequelize, DataTypes) => {
  let rating = sequelize.define('rating', {
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    portfolioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  rating.associate = function(models) {
    rating.belongsTo(models.user);
    rating.belongsTo(models.portfolio);
  };
  return rating;
};
