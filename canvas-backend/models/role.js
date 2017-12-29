'use strict';
module.exports = (sequelize, DataTypes) => {
  let Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });
  Role.associate = function(models) {
    Role.belongsToMany(models.User, {through: 'UserRoles', as: 'users', foreignKey: 'roleId', otherKey: 'userId'});
  };
  return Role;
};
