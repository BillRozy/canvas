let express = require('express');
let router = express.Router();
const passport = require('../auth/passport.js');

/* GET users listing. */
router.get('/', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }) , function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
