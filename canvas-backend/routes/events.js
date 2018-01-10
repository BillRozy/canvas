let express = require('express');
let router = express.Router();
const Promise = require('bluebird');
const passport = require('../auth/passport.js');
const Event = require('../models').Event;


router.get('/:id',(req, res) => {
  const id = req.param('id');
  Event.findById(id)
    .then(event => {
      res.json(event);
    })
    .catch(err => {
      res.json(err);
    });
});

/* GET all events listing. */
router.get('/',(req, res) => {
  Event.findAll()
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
