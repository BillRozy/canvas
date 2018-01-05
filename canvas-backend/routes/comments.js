let express = require('express');
let router = express.Router();
const Promise = require('bluebird');
const passport = require('../auth/passport.js');
const Comment = require('../models').Comment;
const User = require('../models').User;
const authorizedRoles = require('../auth/roles-authorize');
const Log = require('../logger');

/* GET users listing. */
router.get('/:id',(req, res) => {
  const id = req.params.id;
  Comment.findById(id)
    .then(c => {
      res.json(c);
    })
    .catch(err => {
      res.json(err);
    });
});

/* POST comment listing. */
router.post('/', passport.authenticate('jwt', { session: false }),(req, res) => {
  if (!req.body) {
    res.status(500).json({msg: 'Empty Body'});
  }
  const toAdd = JSON.parse(JSON.stringify(req.body));
  toAdd.userId = req.user.id;
  User.findById(req.user.id)
    .then(user => {
      return user.createComment(toAdd)
        .then(c => {
          const result = c.toJSON();
          result.user = user.toJSON();
          res.json(result);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    })
    .then(c => {
      const result = c.toJSON();
      result.user = req.user.toJSON();
      res.json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// get all
router.get('/',passport.authenticate('jwt', { session: false }),authorizedRoles('ROLE_OPERATOR'),(req, res) => {
  Comment.findAll()
    .then(comments => {
      res.json(comments);
    })
    .catch(err => {
      res.status(500).json(err);
      Log.error(err);
    });
});

router.get('/user/:id',(req, res) => {
  const id = req.params.id;
  Promise.coroutine(function* () {
    let comments = [];
    const user = yield User.findById(id);
    if (!user) {
      res.json({success: false, msg: 'Can\'t find user'});
    } else {
      comments = yield user.getComments();
      res.json(comments);
    }
  })().catch(err => Log.error(err));
});

module.exports = router;
