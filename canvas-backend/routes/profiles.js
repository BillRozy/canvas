let express = require('express');
let router = express.Router();
const Promise = require('bluebird');
const passport = require('../auth/passport.js');
const profile = require('../models').profile;
const authorizedRoles = require('../auth/roles-authorize');
const Log = require('../logger');

/* GET users listing. */
router.get('/:id',(req, res) => {
  const id = req.param('id');
  profile.findById(id)
    .then(profile => {
      res.json(profile);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/',passport.authenticate('jwt', { session: false }), authorizedRoles('ROLE_ADMIN'),(req, res) => {
  profile.findAll()
    .then(profiles => {
      res.json(profiles);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put('/:id',passport.authenticate('jwt', { session: false }),(req, res) => {
  const id = req.param('id');
  Log.debug(id);
  const updated = req.body;
  Promise.coroutine(function* () {
    const userProfile = yield req.user.getProfile();
    Log.debug(userProfile.id);
    if (id == userProfile.id) {
      const unused = yield userProfile.update(updated);
      res.json({message: 'Success'});
    } else {
      res.status(403).json({success: false, msg: 'Wrong profile!'});
    }
  })().catch(err => Log.error(err));
});

module.exports = router;
