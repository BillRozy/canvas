'use strict';
const models = require('../models');

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
    if (!opts) {
      return this.getAllOffers();
    }
    return new Promise((resolve, reject) => {
      this.model.findAll(this._createQuery(opts))
        .then(offers => {
          resolve(offers);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  _createQuery(opts) {
    const query = {
      where: {

      },
    };
    if (opts.name) {
      query.where.name = {
        $like: `%${opts.name}`,
      };
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
