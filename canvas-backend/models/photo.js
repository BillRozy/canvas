'use strict';
module.exports = (sequelize, DataTypes) => {
  let photo = sequelize.define('photo', {
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
  photo.associate = function(models) {
    photo.belongsTo(models.user);
  };
  return photo;
};
