'use strict';
const models = require('../models');
const Promise = require('bluebird').Promise;
const Log = require('../logger');
const Op = require('sequelize').Op;

class Catalog {
  constructor(scope) {
    this.model = (scope && scope === 'video') ? models.VideoOffer : models.PhotoOffer;
  }
  getAllOffers() {
    return new Promise((resolve, reject) => {
      this.model.findAll()
        .then(offers => {
          resolve(offers);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  query(opts, userIds) {
    const self = this;
    return Promise.coroutine(function* () {
      let result = [];
      if (!opts) {
        result = yield self.getAllOffers();
      } else {
        console.log('Created query: ' + JSON.stringify(self._createQuery(opts)));
        const offers = yield self.model.findAll(self._createQuery(opts, userIds));
        for (let i = 0; i < offers.length; i++) {
          const offerUser = yield offers[i].getUser();
          const photos = yield offerUser.getPhotos({
            where: {'category': offers[i].category},
            limit: 5,
          });
          result.push(offers[i].get());
          result[i].photos = photos;
        }
      }
      return result;
    })();
  }

  _createQuery(opts, userIds) {
    const query = {
      where: {

      },
    };
    if (userIds) {
      query.where.userId = {
        [Op.in]: userIds,
      };
    }
    if (opts.category) {
      query.where.category = opts.category;
    }
    if (opts.price) {
      query.where.price = {};
      if (opts.price[0]) {
        query.where.price[Op.gte] = parseInt(opts.price[0]);
      }
      if (opts.price[1]) {
        query.where.price[Op.lte] = parseInt(opts.price[1]);
      }
    }
    return query;
  }
}
module.exports = Catalog;
