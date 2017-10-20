'use strict';
const Log = require('../logger');
const security = require('../config/secure-config.js');
const SecureHelp = require('../helpers/security');

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.prototype.validPassword = function(password) {
    return SecureHelp.verifyPassword(password, this.password);
  };
  User.associate = function(models) {
    User.belongsToMany(models.role, {through: 'user_roles', as: 'role'});
  };
  User.hook('beforeCreate', (user) => {
    return SecureHelp.hashPassword(user.password)
      .then(hashedPassword => {
        user.password = hashedPassword;
      })
      .catch(err => {
        Log.error(err);
      });
  });
  User.hook('beforeUpdate', (user) => {
    return SecureHelp.hashPassword(user.password)
      .then(hashedPassword => {
        user.password = hashedPassword;
      })
      .catch(err => {
        Log.error(err);
      });
  });
  return User;
};
