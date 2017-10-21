'use strict';
const Log = require('../logger');
const SecureHelp = require('../helpers/security');
const Promise = require('bluebird');

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
  User.prototype.toJSON =  function() {
    let values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };
  User.associate = function(models) {
    User.belongsToMany(models.role, {through: 'user_roles', as: 'role'});
    User.hasMany(models.photo);
    User.hasMany(models.photo_offer);
    User.hasMany(models.video);
    User.hasMany(models.video_offer);
    User.hasMany(models.comment);
    User.hasMany(models.rating);
    User.hasOne(models.portfolio);
    User.hasOne(models.profile);
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
  User.hook('afterSave', (user) => {

    return Promise.coroutine(function* () {
      const pr = yield sequelize.models.profile.create({
        name: 'Guest',
        userId: user.id,
      });
      const ref = yield user.setProfile(pr);
    })().catch(err => Log.error(err));
  });
  return User;
};