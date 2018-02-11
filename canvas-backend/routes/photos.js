let express = require('express');
let router = express.Router();
const Promise = require('bluebird');
const passport = require('../auth/passport.js');
const models = require('../models');
const authorizedRoles = require('../auth/roles-authorize');
const Log = require('../logger');
const s3 = require('../helpers/aws_s3');
const uploadPhotos = require('../helpers/uploader').uploadPhotos;

router.post('/', passport.authenticate('jwt', { session: false }),uploadPhotos, authorizedRoles('ROLE_OPERATOR') ,(req, res) => {
  const userId = req.user.id;
  const category = req.query.category;
  if (!category) {
    res.status(400).json({message: 'wrong category'});
  }
  const resJson = [];
  Log.info('i GOT: ' + JSON.stringify(req.files));
  let files = [];
  for (let i = 0; i < req.files.length; ++i) {
    let path;
    if (req.files[i].filename) {
      const parsed = path.parse(req.files[i].filename);
      path = `${parsed.name}${parsed.ext}`;
    } else {
      const splitted = req.files[i].key.split('/');
      path = splitted[splitted.length - 1];
    }
    const obj = {
      userId,
      category,
      path,
    };
    files.push(models.Photo.create(obj).then(ph => resJson.push(ph)));
  }
  Promise.all(files).then(function() {
    res.json(resJson);
  });
});

router.get('/:userId/:key' ,(req, res) => {
  s3.getObject({
    Key: `photos/${req.params.userId}/${req.params.key}`,
    Bucket: process.env.S3_BUCKET || 'canvas-backend-storage',
  }, (err, data) => {
    if (err) {
      Log.error(err);
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.set('Content-Type', data.ContentType);
      res.send(data.Body);
    }
  });
});


module.exports = router;
