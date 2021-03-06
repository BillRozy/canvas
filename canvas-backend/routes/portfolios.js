let express = require('express');
let router = express.Router();
const passport = require('../auth/passport.js');
const Portfolio = require('../models').Portfolio;
const authorizedRoles = require('../auth/roles-authorize');
const Log = require('../logger');

/* GET users listing. */
router.get('/:id',(req, res) => {
  const id = req.param('id');
  Portfolio.findById(id)
    .then(portfolio => {
      res.json(portfolio);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/',passport.authenticate('jwt', { session: false }), authorizedRoles('ROLE_ADMIN'),(req, res) => {
  Portfolio.findAll()
    .then(portfolios => {
      res.json(portfolios);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
