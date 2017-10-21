let express = require('express');
let router = express.Router();
const Promise = require('bluebird');
const jwt = require('jwt-simple');
const passport = require('../auth/passport.js');
const User = require('../models').user;
const omit = require('json-omit');
const SecureCfg = require('../config/secure-config');
const authorizedRoles = require('../auth/roles-authorize');
const Log = require('../logger');

/* GET users listing. */
router.get('/current', passport.authenticate('jwt', { session: false }),authorizedRoles('ROLE_ADMIN') ,(req, res) => {
  User.findAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.json(err);
    });

});

router.post('/signin', (req, res) => {
  const {username, password} = req.body;
  Promise.coroutine(function* () {
    const user = yield User.findOne({where: {username}});
    if (!user) {
      res.json({success: false, msg: 'Authentication failed'});
    }
    const isValidPassword = yield user.validPassword(password);
    if (isValidPassword) {
      const token = jwt.encode(omit(user.dataValues, [ 'password' ]), SecureCfg.jwtSecret);
      res.json({success: true, token});
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


module.exports = router;
