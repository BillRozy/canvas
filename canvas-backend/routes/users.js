let express = require('express');
let router = express.Router();
const Promise = require('bluebird');
const jwt = require('jwt-simple');
const passport = require('../auth/passport.js');
const models = require('../models');
const User = require('../models').User;
const omit = require('json-omit');
const SecureCfg = require('../config/secure-config');
const authorizedRoles = require('../auth/roles-authorize');
const Log = require('../logger');

/* GET users listing. */
router.get('/', passport.authenticate('jwt', { session: false }),authorizedRoles('ROLE_ADMIN') ,(req, res) => {
  User.findAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.json(err);
    });
});

/* GET users listing. */
router.get('/self', passport.authenticate('jwt', { session: false }) ,(req, res) => {
  User.scope('fullInfo').findById(req.user.id)
    .then(reloaded => {
      res.json(reloaded);
    });
});

router.post('/signin', (req, res) => {
  const {username, password} = req.body;
  Promise.coroutine(function* () {
    const user = yield User.unscoped().findOne(
      {
        where: {username},
        include: [ 'roles' ],
      });
    if (!user) {
      res.json({success: false, msg: 'Authentication failed: no user'});
    }
    const isValidPassword = yield user.validPassword(password);
    if (isValidPassword) {
      const token = jwt.encode(omit(user.dataValues, [ 'password' ]), SecureCfg.jwtSecret);
      res.json({user, token});
    } else {
      res.json({success: false, msg: 'Authentication failed: password invalid'});
    }
  })().catch(err => Log.error(err));

});

router.post('/signup', (req, res) => {
  const {username, password, operator} = req.body;
  Promise.coroutine(function* () {
    const user = yield User.create({username, password});
    if (user && operator) {
      const opRole = yield models.Role.findOne({
        where: {
          title: 'ROLE_OPERATOR',
        },
      });
      yield user.setRoles([ opRole ]);
      yield user.createPortfolio();
      yield user.reload();
    }
    res.json(omit(user, [ 'password' ]));
  })().catch(err => Log.error(err));
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET user's profile. */
router.get('/:id/profile',(req, res) => {
  const id = req.param('id');
  Promise.coroutine(function* () {
    const user = yield User.findById(id);
    if (!user) {
      res.json({success: false, msg: 'Can\'t find user'});
    }
    const profile = yield user.getProfile();
    if (!profile) {
      res.json({success: false, msg: 'Can\'t find profile'});
    } else {
      res.json(profile);
    }
  })().catch(err => Log.error(err));
});

/* POST user's profile. */
router.post('/:id/profile',passport.authenticate('jwt', { session: false }),(req, res) => {
  const id = req.param('id');
  const data = req.body;
  Promise.coroutine(function* () {
    const user = yield User.findById(id);
    if (!user) {
      res.json({success: false, msg: 'Can\'t find user'});
    }
    const profile = yield user.getProfile();
    if (!profile) {
      res.json({success: false, msg: 'Can\'t find profile'});
    } else {
      yield profile.update(data);
      res.json({success: true});
    }
  })().catch(err => Log.error(err));
});

/* GET user's portfolio. */
router.get('/:id/portfolio',passport.authenticate('jwt', { session: false }),(req, res) => {
  const id = req.param('id');
  Promise.coroutine(function* () {
    const user = yield User.findById(id);
    if (!user && !user.isOperator()) {
      res.json({success: false, msg: 'Can\'t find user'});
    }
    let portfolio = yield user.getPortfolio();
    if (!portfolio) {
      portfolio = yield user.createPortfolio();
    }
    const portfolioJson = portfolio.toJSON(); // to prepare ratings
    if (portfolioJson.rating) {
      const currentUserRating = yield models.Rating.findOne({
        where: {
          userId: req.user ? req.user.id : -1,
          portfolioId: portfolio.id,
        },
      });
      portfolioJson.rating.currentUserRating = currentUserRating ? currentUserRating.value : 0;
    }
    res.json(portfolioJson);
  })().catch(err => Log.error(err));
});


module.exports = router;
