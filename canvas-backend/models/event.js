'use strict';
module.exports = (sequelize, DataTypes) => {
  let Event = sequelize.define('Event', {
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
  Event.associate = function(models) {
    Event.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
  };
  return Event;
};
