var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var roomRouter = require('./routes/room');


const GOOGLE_CLIENT_ID = "815168898054-nvqai4si3tps738nfdav9bevjbgnv5gs.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "cat0iQCg7V8sgyLyEq6RdfkI";

var app = express();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
MONGO_URL = "mongodb+srv://sigma-client:0uPSeu7rQw43RHyW@cluster0-vsetw.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(MONGO_URL, {
  reconnectTries: 100,
  reconnectInterval: 500,
  autoReconnect: true,
  useNewUrlParser: true,
  dbName: 'peerP'
})
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var User = require("./models/User");

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ 
    googleId: profile.id, 
    displayName: profile.displayName, 
    firstName: profile.name.givenName, 
    lastName: profile.name.familyName,
    email: profile._json.email,
    pictureUrl: profile._json.picture
  }, function (err, user) {
    return cb(err, user);
  });
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/room', roomRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
