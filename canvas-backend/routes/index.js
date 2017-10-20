let express = require('express');
let router = express.Router();
const passport = require('passport');
const authorizedRoles = require('../auth/roles-authorize');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/securedArea', passport.authenticate('jwt', { session: false }),authorizedRoles('ROLE_ADMIN') ,(req, res) => {
  res.json({msg: 'You made it to the secure area'});
});

module.exports = router;
