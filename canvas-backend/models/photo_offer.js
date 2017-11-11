'use strict';
const photoCategories = [ 'TFP','Fashion','Свадебная','Детская и семейная', 'Праздники', 'Концерты и вечеринки',
  'Персональная', 'Love Story', 'Коммерческая','Интерьерная','Предметная','Другие' ];
module.exports = (sequelize, DataTypes) => {
  let photoOffer = sequelize.define('photoOffer', {
    category: {
      type: DataTypes.ENUM(photoCategories),
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
    portfolioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  photoOffer.associate = function(models) {
    photoOffer.belongsTo(models.user);
    photoOffer.belongsTo(models.portfolio);
    photoOffer.addScope('defaultScope',
      {
        include: [ {
          model: models.user,
          include: [ {
            model: models.photo,
            where: {category: {$col: sequelize.literal('photoOffers.category')}},
          } ],
        } ],
      }
      ,{override: true});
  };
  return photoOffer;
};
