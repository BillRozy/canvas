'use strict';
module.exports = (sequelize, DataTypes) => {
  let UserRoles = sequelize.define('UserRole', {
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
