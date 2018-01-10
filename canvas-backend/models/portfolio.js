'use strict';
module.exports = (sequelize, DataTypes) => {
  let Portfolio = sequelize.define('Portfolio', {
    description: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Portfolio.associate = function(models) {
    Portfolio.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    Portfolio.hasMany(models.Rating, {as: 'ratings' ,foreignKey: 'portfolioId'});
    Portfolio.hasMany(models.Comment, {as: 'comments' ,foreignKey: 'portfolioId'});
    Portfolio.hasMany(models.PhotoOffer, {as: 'photoOffers' ,foreignKey: 'portfolioId'});
    Portfolio.hasMany(models.VideoOffer, {as: 'videoOffers' ,foreignKey: 'portfolioId'});
    Portfolio.addScope('defaultScope', {
      include: [
        {
          model: models.Rating,
          as: 'ratings',
        },
        {
          model: models.PhotoOffer,
          as: 'photoOffers',
        },
        {
          model: models.VideoOffer,
          as: 'videoOffers',
        },
        {
          model: models.User,
          as: 'user',
          include: [
            {
              model: models.Photo,
              as: 'photos',
              order: [
                [ models.Photo, 'createdAt', 'DESC' ],
              ],
            },
          ],
        },
        {
          model: models.Comment,
          as: 'comments',
        },
      ],
    },{override: true});
  };
  Portfolio.prototype.toJSON = function() {
    let repr = this.dataValues;
    repr.rating = this.calcRating();
    delete repr.ratings;
    return repr;
  };
  Portfolio.prototype.calcRating = function() {
    let repr = this.dataValues;
    let rating = {};
    if (repr.ratings) {
      let rateSum = 0;
      let votes = 0;
      repr.ratings.forEach(rating => {
        votes++;
        rateSum += rating.value;
      });
      rating.avg =  votes > 0 ? rateSum / votes : 0;
      rating.votes = votes;
    }
    return rating;
  };
  return Portfolio;
};
