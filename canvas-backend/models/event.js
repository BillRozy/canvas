'use strict';
module.exports = (sequelize, DataTypes) => {
  let event = sequelize.define('event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: DataTypes.STRING,
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: DataTypes.STRING,
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  event.associate = function(models) {
    event.belongsTo(models.user);
  };
  return event;
};
