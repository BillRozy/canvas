'use strict';
module.exports = (sequelize, DataTypes) => {
  let Comment = sequelize.define('Comment', {
    body: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    portfolioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    Comment.belongsTo(models.Portfolio, {foreignKey: 'portfolioId', as: 'portfolio'});
    Comment.addScope('defaultScope', {
      include: [ {
        model: models.User,
        as: 'user',
      } ],
    },{override: true});
  };
  return Comment;
};
