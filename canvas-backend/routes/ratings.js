let express = require('express');
let router = express.Router();
const Promise = require('bluebird');
const passport = require('../auth/passport.js');
const Rating = require('../models').Rating;
const Log = require('../logger');

router.post('/',passport.authenticate('jwt', { session: false }),(req, res) => {
  const prms = req.body;
  const rate = prms.rate;
  const portfolioId = prms.portfolioId;
  const userId = req.user.id;
  Promise.coroutine(function* () {
    let rating = yield Rating.findOne({
      where: {
        userId,
        portfolioId,
      },
    });
    if (rating) {
      rating = yield rating.update({
        value: rate,
      });
    } else {
      rating = yield Rating.create({
        value: rate,
        userId,
        portfolioId,
      });
    }
    const portfolio = yield rating.getPortfolio();
    const update = portfolio.calcRating();
    update.currentUserRating = rate;
    res.json(update);
  })().catch(err => Log.error(err));
});

module.exports = router;
