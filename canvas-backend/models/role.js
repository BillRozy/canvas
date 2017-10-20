'use strict';
module.exports = (sequelize, DataTypes) => {
  let Role = sequelize.define('role', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });
  Role.associate = function(models) {
    Role.belongsToMany(models.user, {through: 'user_roles', as: 'user'});
  };
  return Role;
};
