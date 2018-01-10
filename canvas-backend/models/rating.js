'use strict';
module.exports = (sequelize, DataTypes) => {
  let Rating = sequelize.define('Rating', {
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
  Rating.associate = function(models) {
    Rating.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    Rating.belongsTo(models.Portfolio, {foreignKey: 'portfolioId', as: 'portfolio'});
  };
  return Rating;
};
