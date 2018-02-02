let express = require('express');
let router = express.Router();
const Promise = require('bluebird');
const jwt = require('jwt-simple');
const passport = require('../auth/passport.js');
const models = require('../models');
const User = require('../models').User;
const omit = require('json-omit');
const SecureCfg = require('../config/secure-config');
const authorizedRoles = require('../auth/roles-authorize');
const Log = require('../logger');
const crypto = require('crypto');
const Mailer = require('../helpers/mailer.js');
const transporter = Mailer.testTransporter;
const pug = require('pug');

/* GET users listing. */
router.get('/', passport.authenticate('jwt', { session: false }),authorizedRoles('ROLE_ADMIN') ,(req, res) => {
  User.findAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.json(err);
    });
});

/* GET users listing. */
router.get('/self', passport.authenticate('jwt', { session: false }) ,(req, res) => {
  User.scope('fullInfo').findById(req.user.id)
    .then(reloaded => {
      res.json(reloaded);
    });
});

router.post('/signin', (req, res) => {
  const {username, password} = req.body;
  Promise.coroutine(function* () {
    const user = yield User.unscoped().findOne(
      {
        where: {username},
        include: [ 'roles' ],
      });
    if (!user) {
      res.status(401).json({success: false, msg: 'Authentication failed: no user'});
    }
    const isValidPassword = yield user.validPassword(password);
    if (isValidPassword) {
      if (user.isVerified) {
        res.json({user, token: token(user)});
      } else {
        res.status(423).json({success: false, msg: 'Need E-mail Confirmation'});
      }
    } else {
      res.status(401).json({success: false, msg: 'Authentication failed: password invalid'});
    }
  })().catch(err => Log.error(err));

});

router.post('/signup', (req, res) => {
  const {username, password, operator} = req.body;
  Promise.coroutine(function* () {
    const user = yield User.create({username, password, isVerified: false});
    if (user) {
      const roles = [];
      const basicRole = yield models.Role.findOne({
        where: {
          title: 'ROLE_USER',
        },
      });
      roles.push(basicRole);
      if (operator) {
        const opRole = yield models.Role.findOne({
          where: {
            title: 'ROLE_OPERATOR',
          },
        });
        roles.push(opRole);
        yield user.createPortfolio();
      }
      yield user.setRoles(roles);
      const token = yield user.createToken({
        token: crypto.randomBytes(16).toString('hex'),
      });
      if (token) {
        const locals = {
          name: user.username,
          confirmUrl: 'http://' + req.headers.host + '/confirmation/' + token.token,
        };
        const mailOptions = {
          from: 'noreply@canvasrussia.com',
          to: user.username, subject: 'Account Verification Token',
          text: `Go to: ${locals.confirmUrl}`,
          html: pug.renderFile('./views/confirmation.pug', locals),
        };
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) { return res.status(500).send({ message: err.message }); }
          console.log('Message sent: %s', info.messageId);
          Mailer.printUrl(info);
          res.status(200).send('A verification email has been sent to ' + user.username + '.');
        });
      }
      // yield user.reload();
    }
    // const reloaded = yield User.unscoped().findOne(
    //   {
    //     where: {username},
    //     include: [ 'roles' ],
    //   });
    // res.json({user: reloaded, token: token(reloaded)});
  })().catch(err => {
    Log.error(err);
    return res.status(500).send({ message: err.message });
  });
});

router.post('/confirmation/:token', (req, res) => {
  // Find a matching token
  Promise.coroutine(function* () {
    const token = yield models.Token.findOne({where: { token: req.params.token }});
    if (!token) {return res.status(400).send({ type: 'not-verified', message: 'Мы не нашли вашей заявки на регистрацию. Возможно ссылка истекла или неверна.' });}
    let user = yield User.findById(token.userId);
    if (!user) {return res.status(400).send({ message: 'We were unable to find a user for this token.' });}
    if (user.isVerified) {return res.status(400).send({ type: 'already-verified', message: 'This user has already been verified.' });}
    user = yield user.update({
      isVerified: true,
    });
    res.status(200).send('The account has been verified. Please log in.');
  })()
    .catch(err => {
      if (err) { return res.status(500).send({ message: err.message }); }
    });
});

router.post('/:id/resend', (req, res) => {

});

/* GET user's profile. */
router.get('/:id/profile',(req, res) => {
  const id = req.param('id');
  Promise.coroutine(function* () {
    const user = yield User.findById(id);
    if (!user) {
      res.json({success: false, msg: 'Can\'t find user'});
    }
    const profile = yield user.getProfile();
    if (!profile) {
      res.json({success: false, msg: 'Can\'t find profile'});
    } else {
      res.json(profile);
    }
  })().catch(err => Log.error(err));
});

/* POST user's profile. */
router.post('/:id/profile',passport.authenticate('jwt', { session: false }),(req, res) => {
  const id = req.param('id');
  const data = req.body;
  Promise.coroutine(function* () {
    const user = yield User.findById(id);
    if (!user) {
      res.json({success: false, msg: 'Can\'t find user'});
    }
    const profile = yield user.getProfile();
    if (!profile) {
      res.json({success: false, msg: 'Can\'t find profile'});
    } else {
      yield profile.update(data);
      res.json({success: true});
    }
  })().catch(err => Log.error(err));
});

/* GET user's portfolio. */
router.get('/:id/portfolio',passport.authenticate('jwt', { session: false }),(req, res) => {
  const id = req.param('id');
  Promise.coroutine(function* () {
    const user = yield User.findById(id);
    if (!user && !user.isOperator()) {
      res.json({success: false, msg: 'Can\'t find user'});
    }
    let portfolio = yield user.getPortfolio();
    if (!portfolio) {
      portfolio = yield user.createPortfolio();
    }
    const portfolioJson = portfolio.toJSON(); // to prepare ratings
    if (portfolioJson.rating) {
      const currentUserRating = yield models.Rating.findOne({
        where: {
          userId: req.user ? req.user.id : -1,
          portfolioId: portfolio.id,
        },
      });
      portfolioJson.rating.currentUserRating = currentUserRating ? currentUserRating.value : 0;
    }
    res.json(portfolioJson);
  })().catch(err => Log.error(err));
});

function token(user) {
  return jwt.encode(omit(user.dataValues, [ 'password', 'profile', 'portfolio' ]), SecureCfg.jwtSecret);
}


module.exports = router;
