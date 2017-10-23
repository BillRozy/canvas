'use strict';
module.exports = (sequelize, DataTypes) => {
  let photoOffer = sequelize.define('photoOffer', {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  photoOffer.associate = function(models) {
    photoOffer.belongsTo(models.user);
  };
  return photoOffer;
};
