'use strict';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const securityConfig = require('../config/secure-config');
const User = require('../models').User;
const Log = require('../logger');

module.exports = function() {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = securityConfig.jwtSecret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.unscoped().findOne({
      where: {'id': jwt_payload.id},
      include: [ 'roles' ],
    })
      .then(user => {
        user ? done(null, user) : done(null, false);
      })
      .catch(err => {
        done(err, false);
      });
  }));
};
