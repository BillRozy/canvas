let express = require('express');
let router = express.Router();
const Promise = require('bluebird');
const passport = require('../auth/passport.js');
const models = require('../models');
const authorizedRoles = require('../auth/roles-authorize');
const Log = require('../logger');
const upload = require('../helpers/uploader');

router.post('/:category/upload', passport.authenticate('jwt', { session: false }), authorizedRoles('ROLE_OPERATOR') ,upload.array('photos'),(req, res) => {
  const userId = req.user.id;
  const category = req.params.category;
  const resJson = [];
  Log.info('i GOT: ' + req.files);
  let files = [];
  for (let i = 0; i < req.files.length; ++i) {
    const obj = {
      userId,
      category,
      path: req.files[i].path,
    };
    files.push(models.photo.create(obj).then(ph => resJson.push(ph)));
  }
  Promise.all(files).then(function() {
    res.json(resJson);
  });
});


module.exports = router;
