let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let stylus = require('stylus');
const configurePassport = require('./auth/passport-jwt-config');


let index = require('./routes/index');
let users = require('./routes/users');
let profiles = require('./routes/profiles');
let portfolios = require('./routes/portfolios');
let photo_offers = require('./routes/photo-offers');

const passport = require('./auth/passport.js');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(require('express-session')({ secret: 'jennisgriffitz', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
configurePassport();
// app.use(passport.session());
// app.use(flash());

app.use('/', index);
app.use('/users', users);
app.use('/profiles', profiles);
app.use('/portfolios', portfolios);
app.use('/photo-offers', photo_offers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
