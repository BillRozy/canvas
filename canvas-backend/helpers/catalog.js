'use strict';
const models = require('../models');
const Promise = require('bluebird').Promise;
const Log = require('../logger');

class Catalog {
  constructor(scope) {
    this.model = (scope && scope === 'video') ? models.videoOffer : models.photoOffer;
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

  query(opts) {
    const self = this;
    return Promise.coroutine(function* () {
      let result = [];
      if (!opts) {
        result = yield self.getAllOffers();
      } else {
        console.log('Created query: ' + JSON.stringify(self._createQuery(opts)));
        const offers = yield self.model.findAll(self._createQuery(opts));
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

  _createQuery(opts) {
    const query = {
      where: {

      },
    };
    if (opts.name) {
      query.where.name = {
        $like: `%${opts.name}%`,
      };
    }
    if (opts.category) {
      query.where.category = opts.category;
    }
    const priceQuery = {};
    if (opts.price && opts.price.min) {
      priceQuery.$gte = opts.price.min;
    }
    if (opts.price && opts.price.max) {
      priceQuery.$lte = opts.price.max;
    }
    if (Object.keys(priceQuery) > 0) {
      query.where.price = priceQuery;
    }
    return query;
  }
}
module.exports = Catalog;
