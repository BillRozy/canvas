let express = require('express');
let router = express.Router();
const Catalog = require('../helpers/catalog');
const PhotoCatalog = new Catalog();
const VideoCatalog = new Catalog('video');
const Promise = require('bluebird');
const Log = require('../logger');

/* GET users listing. */
router.get('/photo',(req, res) => {
  console.log('Query: ' + JSON.stringify(req.query));
  PhotoCatalog.query(req.query)
    .then(offers => {
      res.json(offers);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/video',(req, res) => {
  VideoCatalog.query(req.query)
    .then(offers => {
      res.json(offers);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
