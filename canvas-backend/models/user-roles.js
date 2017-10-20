'use strict';
module.exports = (sequelize, DataTypes) => {
  let UserRoles = sequelize.define('user_roles', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return UserRoles;
};
