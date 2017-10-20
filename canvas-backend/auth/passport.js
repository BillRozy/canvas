
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models').User;

passport.use(new LocalStrategy(

  function(username, password, done) {
    User.sync()
      .then(()=> {
        return User.findOne({where: { username }});
      })
      .then(user => {
        if (!user) {return done(null, false, { message: 'Incorrect username.' });}
        if (!user.validPassword(password)) {return done(null, false, { message: 'Incorrect password.' });}
      })
      .catch(err => {
        return done(err);
      });
  }
));

module.exports = passport;
