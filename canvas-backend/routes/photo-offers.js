let express = require('express');
let router = express.Router();
const Promise = require('bluebird');
const passport = require('../auth/passport.js');
const photo_offer = require('../models').photo_offer;
const User = require('../models').user;
const authorizedRoles = require('../auth/roles-authorize');
const Log = require('../logger');

/* GET users listing. */
router.get('/:id',(req, res) => {
  const id = req.param('id');
  photo_offer.findById(id)
    .then(offer => {
      res.json(offer);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/',(req, res) => {
  photo_offer.findAll()
    .then(offers => {
      res.json(offers);
    })
    .catch(err => {
      res.status(500).json(err);
      Log.error(err);
    });
});

router.get('/user/:id',(req, res) => {
  const id = req.params.id;
  Promise.coroutine(function* () {
    let offers = [];
    const user = yield User.findById(id);
    if (!user) {
      res.json({success: false, msg: 'Can\'t find user'});
    } else {
      offers = yield user.getPhoto_offers();
      res.json(offers);
    }
  })().catch(err => Log.error(err));
});

/* GET users listing. */
router.post('/', passport.authenticate('jwt', { session: false }),authorizedRoles('ROLE_OPERATOR'),(req, res) => {
  if (!req.body) {
    res.status(500).json({msg: 'Empty Body'});
  }
  const toAdd = JSON.parse(JSON.stringify(req.body));
  toAdd.userId = req.user.id;
  photo_offer.create(toAdd)
    .then(offer => {
      res.json(offer);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
