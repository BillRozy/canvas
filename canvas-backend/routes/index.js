let express = require('express');
let router = express.Router();
const passport = require('passport');
const authorizedRoles = require('../auth/roles-authorize');
const models = require('../models');
const Log = require('../logger');
const Promise = require('bluebird');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/price-extent', function(req, res, next) {
  Promise.coroutine(function* () {
    const minVideo = yield models.VideoOffer.min('price');
    const maxVideo = yield models.VideoOffer.max('price');
    const minPhoto = yield models.PhotoOffer.min('price');
    const maxPhoto = yield models.PhotoOffer.max('price');
    const result = {
      video: {
        min: minVideo || 0,
        max: maxVideo || 1000,
      },
      photo: {
        min: minPhoto || 0,
        max: maxPhoto || 1000,
      },
    };
    res.json(result);
  })().catch(err => {
    Log.error(err);
    res.status(500);
  });
});

router.get('/securedArea', passport.authenticate('jwt', { session: false }),authorizedRoles('ROLE_ADMIN') ,(req, res) => {
  res.json({msg: 'You made it to the secure area'});
});

module.exports = router;
