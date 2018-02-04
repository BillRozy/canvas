'use strict';
module.exports = (sequelize, DataTypes) => {
  let Video = sequelize.define('Video', {
    title: DataTypes.STRING,
    vid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('vimeo', 'youtube', 'raw'),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
