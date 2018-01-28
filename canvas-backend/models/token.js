'use strict';
module.exports = (sequelize, DataTypes) => {
  let Token = sequelize.define('Token', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Token.associate = function(models) {
    Token.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
  };
  Token.prototype.autoexpire = (minutes) => {
    setTimeout(() => {
      this.destroy();
    }, 1000 * 60 * minutes);
  };
  return Token;
};
