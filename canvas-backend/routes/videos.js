let express = require('express');
let router = express.Router();
const path = require('path');
const Promise = require('bluebird');
const passport = require('../auth/passport.js');
const models = require('../models');
const authorizedRoles = require('../auth/roles-authorize');
const Log = require('../logger');
const videoUrlParser = require('js-video-url-parser');

router.post('/', passport.authenticate('jwt', { session: false }), authorizedRoles('ROLE_OPERATOR') ,(req, res) => {
  const video = req.body;
  const {id, provider} = videoUrlParser.parse(video.url)
  req.user.createVideo({
    vid: id,
    type: provider,
    category: video.category,
  })
  .then(video => {
    res.json(video);
  })
  .catch(err => {
    res.status(500).json({
      message: err.message,
    })
  })
});


module.exports = router;
