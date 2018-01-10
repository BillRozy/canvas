'use strict';
module.exports = (sequelize, DataTypes) => {
  let Video = sequelize.define('Video', {
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
  Video.associate = function(models) {
    Video.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
  };
  return Video;
};
