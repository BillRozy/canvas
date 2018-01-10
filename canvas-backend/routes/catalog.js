let express = require('express');
let router = express.Router();
const Catalog = require('../helpers/catalog');
const PhotoCatalog = new Catalog();
const VideoCatalog = new Catalog('video');
const User = require('../models').User;
const Profile = require('../models').Profile;
const Promise = require('bluebird');
const Log = require('../logger');
const Op = require('sequelize').Op;

/* GET users listing. */
router.get('/photo',(req, res) => {
  Log.info('Query: ' + JSON.stringify(req.query));
  Promise.coroutine(function* () {
    let ids = null;
    if (req.query.name) {
      const users =  yield User.findAll({
        include: [ {
          model: Profile,
          as: 'profile',
          where: {
            name: {
              [Op.like]: `%${req.query.name}%`,
            },
          },
        } ],
      });
      ids = users.map(user => user.id);
      delete req.query.name;
    }
    const offers = yield PhotoCatalog.query(req.query, ids);
    res.json(offers);
  })()
    .catch(err => {
      Log.error(err.message);
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
