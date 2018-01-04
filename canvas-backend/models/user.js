'use strict';
const Log = require('../logger');
const SecureHelp = require('../helpers/security');
const Promise = require('bluebird');

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
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
  User.prototype.isOperator = function() {
    return this.roles && this.roles.map(role => role.title).includes('ROLE_OPERATOR');
  };

  User.prototype.validPassword = function(password) {
    return SecureHelp.verifyPassword(password, this.password);
  };
  User.prototype.toJSON =  function() {
    let values = Object.assign({}, this.get());

    delete values.password;
    if (values.roles) {
      values.roles = values.roles.map(function(role) {
        return role.title;
      });
    }

    return values;
  };
  User.associate = function(models) {
    User.belongsToMany(models.Role, {through: 'UserRoles', as: 'roles', foreignKey: 'userId', otherKey: 'roleId'});
    User.hasMany(models.Photo, {as: 'photos' ,foreignKey: 'userId'});
    User.hasMany(models.PhotoOffer, {as: 'photoOffers',foreignKey: 'userId'});
    User.hasMany(models.Video, {as: 'videos',foreignKey: 'userId'});
    User.hasMany(models.VideoOffer, {as: 'videoOffers',foreignKey: 'userId'});
    User.hasMany(models.Comment, {as: 'comments',foreignKey: 'userId'});
    User.hasMany(models.Rating, {as: 'ratings',foreignKey: 'userId'});
    User.hasOne(models.Portfolio, {foreignKey: 'userId', as: 'portfolio'});
    User.hasOne(models.Profile, {foreignKey: 'userId', as: 'profile'});
    User.addScope('defaultScope', {
      include: [ {
        model: models.Profile,
        as: 'profile',
      } ],
      attributes: {
        exclude: [ 'password' ],
      },
    },{override: true});

    User.addScope('fullInfo', {
      include: [ 'profile', 'portfolio', 'roles' ],
      attributes: {
        exclude: [ 'password' ],
      },
    },{override: true});

    User.addScope('unsafe', {
      include: [ {
        model: models.Profile,
        as: 'profile',
        attributes: [ 'avatar', 'name', 'surname' ],
      } ],
    },{override: true});
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
      yield user.createProfile({
        name: 'Guest',
      });
    })().catch(err => Log.error(err));
  });
  return User;
};
