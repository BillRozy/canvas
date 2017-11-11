'use strict';
module.exports = (sequelize, DataTypes) => {
  let portfolio = sequelize.define('portfolio', {
    description: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  portfolio.associate = function(models) {
    portfolio.belongsTo(models.user);
    portfolio.hasMany(models.rating);
    portfolio.hasMany(models.comment);
    portfolio.hasMany(models.photoOffer);
    portfolio.hasMany(models.videoOffer);
    portfolio.addScope('defaultScope', {
      include: [
        {
          model: models.rating,
        },
        {
          model: models.photoOffer,
        },
        {
          model: models.videoOffer,
        },
        {
          model: models.user,
          include: [
            {
              model: models.photo,
              order: [
                [ models.photo, 'createdAt', 'DESC' ],
              ],
            },
          ],
        },
        {
          model: models.comment,
        },
      ],
    },{override: true});
  };
  return portfolio;
};
