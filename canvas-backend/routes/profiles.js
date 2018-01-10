let express = require('express');
let router = express.Router();
const Promise = require('bluebird');
const passport = require('../auth/passport.js');
const Profile = require('../models').Profile;
const authorizedRoles = require('../auth/roles-authorize');
const uploadAvatar = require('../helpers/uploader').uploadAvatar;
const Log = require('../logger');

/* GET users listing. */
router.get('/:id',(req, res) => {
  const id = req.param('id');
  Profile.findById(id)
    .then(profile => {
      res.json(profile);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/',passport.authenticate('jwt', { session: false }), authorizedRoles('ROLE_ADMIN'),(req, res) => {
  Profile.findAll()
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
      yield userProfile.update(updated);
      res.json({message: 'Success'});
    } else {
      res.status(403).json({success: false, msg: 'Wrong profile!'});
    }
  })().catch(err => Log.error(err));
});

router.post('/avatar', passport.authenticate('jwt', { session: false }),uploadAvatar,(req, res) => {
  const path = '/api/' + req.file.path;
  Promise.coroutine(function* () {
    const profile = yield req.user.getProfile();
    const updated = yield profile.update({
      avatar: path,
    });
    res.json({
      profile: updated,
    });
  })().catch(err => Log.error(err));
});

module.exports = router;
