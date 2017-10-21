'use strict';
module.exports = (sequelize, DataTypes) => {
  let profile = sequelize.define('profile', {
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
  profile.associate = function(models) {
    profile.belongsTo(models.user);
  };
  return profile;
};
