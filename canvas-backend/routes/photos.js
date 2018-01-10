let express = require('express');
let router = express.Router();
const path = require('path');
const Promise = require('bluebird');
const passport = require('../auth/passport.js');
const models = require('../models');
const authorizedRoles = require('../auth/roles-authorize');
const Log = require('../logger');
const uploadPhotos = require('../helpers/uploader').uploadPhotos;

router.post('/', passport.authenticate('jwt', { session: false }),uploadPhotos, authorizedRoles('ROLE_OPERATOR') ,(req, res) => {
  const userId = req.user.id;
  const category = req.query.category;
  if (!category) {
    res.status(400).json({message: 'wrong category'});
  }
  const resJson = [];
  Log.info('i GOT: ' + req.files.length);
  let files = [];
  for (let i = 0; i < req.files.length; ++i) {
    const parsed = path.parse(req.files[i].filename);
    const obj = {
      userId,
      category,
      path: `${parsed.name}${parsed.ext}`,
    };
    files.push(models.Photo.create(obj).then(ph => resJson.push(ph)));
  }
  Promise.all(files).then(function() {
    res.json(resJson);
  });
});


module.exports = router;
