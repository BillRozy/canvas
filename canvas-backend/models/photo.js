'use strict';
module.exports = (sequelize, DataTypes) => {
  let Photo = sequelize.define('Photo', {
    title: DataTypes.STRING,
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Photo.associate = function(models) {
    Photo.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
  };
  return Photo;
};
