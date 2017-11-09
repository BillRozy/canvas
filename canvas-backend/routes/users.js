let express = require('express');
let router = express.Router();
const Promise = require('bluebird');
const jwt = require('jwt-simple');
const passport = require('../auth/passport.js');
const models = require('../models');
const User = require('../models').user;
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
  res.json(req.user);
});

router.post('/signin', (req, res) => {
  const {username, password} = req.body;
  Promise.coroutine(function* () {
    const user = yield User.findOne(
      {
        where: {username},
        include: [ 'role' ],
      });
    if (!user) {
      res.json({success: false, msg: 'Authentication failed'});
    }
    const isValidPassword = yield user.validPassword(password);
    if (isValidPassword) {
      const token = jwt.encode(omit(user.dataValues, [ 'password' ]), SecureCfg.jwtSecret);
      res.json({user, token});
    } else {
      res.json({success: false, msg: 'Authentication failed'});
    }
  })().catch(err => Log.error(err));

});

router.post('/signup', (req, res) => {
  const {username, password} = req.body;
  User.sync()
    .then(() => {
      return User.create({username, password});
    })
    .then(user => {
      res.json(omit(user, [ 'password' ]));
    })
    .catch(err => {
      Log.error(err);
    });
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
      const rows = yield profile.update(data);
      res.json({success: true});
    }
  })().catch(err => Log.error(err));
});

/* GET user's portfolio. */
router.get('/:id/portfolio',(req, res) => {
  const id = req.param('id');
  Promise.coroutine(function* () {
    const user = yield User.findById(id);
    if (!user && !user.isOperator) {
      res.json({success: false, msg: 'Can\'t find user'});
    }
    let portfolio = yield user.getPortfolio({
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
          model: User,
          include: [
            {
              model: models.photo,
            },
            {
              model: models.profile,
              attributes: [ 'avatar', 'name', 'surname' ],
            } ],
        },
        {
          model: models.comment,
          include: [ {
            model: User,
            attributes: {
              exclude: [ 'password', 'createdAt', 'updatedAt' ],
            },
            include: [ {
              model: models.profile,
              attributes: [ 'avatar', 'name', 'surname' ],
            } ],
          } ],
        },
      ],
    });
    if (!portfolio) {
      portfolio = yield user.createPortfolio();
    }
    // additions
    const json = portfolio.get();
    json.photoCategories = models.photoOffer.rawAttributes.category.values;
    json.videoCategories = models.videoOffer.rawAttributes.category.values;
    res.json(json);
  })().catch(err => Log.error(err));
});


module.exports = router;
