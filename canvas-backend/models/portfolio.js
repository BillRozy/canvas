'use strict';
module.exports = (sequelize, DataTypes) => {
  let portfolio = sequelize.define('portfolio', {
    description: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  portfolio.associate = function(models) {
    portfolio.belongsTo(models.user);
    portfolio.hasMany(models.rating);
    portfolio.hasMany(models.comment);
  };
  return portfolio;
};
