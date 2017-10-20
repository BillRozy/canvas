let express = require('express');
let router = express.Router();
const Promise = require('bluebird');
const jwt = require('jwt-simple');
const passport = require('../auth/passport.js');
const User = require('../models').user;
const omit = require('json-omit');
const SecureCfg = require('../config/secure-config');
const Log = require('../logger');

/* GET users listing. */
router.get('/', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }) , function(req, res) {
  res.send('respond with a resource');
});

router.post('/signin', (req, res) => {
  const {username, password} = req.body;
  Promise.coroutine(function* () {
    const validate = yield User.sync();
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

module.exports = router;
