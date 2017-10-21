'use strict';
module.exports = (sequelize, DataTypes) => {
  let video = sequelize.define('video', {
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
  video.associate = function(models) {
    video.belongsTo(models.user);
  };
  return video;
};
