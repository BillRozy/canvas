'use strict';
module.exports = (sequelize, DataTypes) => {
  let Profile = sequelize.define('Profile', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: DataTypes.STRING,
    sex: DataTypes.STRING,
    birthday: DataTypes.DATE,
    city: DataTypes.STRING,
    avatar: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    social_email: DataTypes.STRING,
    social_network: DataTypes.STRING,
    hobby: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Profile.associate = function(models) {
    Profile.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
  };
  return Profile;
};
