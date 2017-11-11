'use strict';
module.exports = (sequelize, DataTypes) => {
  let comment = sequelize.define('comment', {
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
  comment.associate = function(models) {
    comment.belongsTo(models.user);
    comment.belongsTo(models.portfolio);
    comment.addScope('defaultScope', {
      include: [ {
        model: models.user,
      } ],
    },{override: true});
  };
  return comment;
};
