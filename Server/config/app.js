let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');
//modeles for authentication 

let session = require('express-session');
let passport = require('passport');

let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

//databse setup 
let mongoose = require('mongoose');
let db = require('./db')
//point mongoose to db URI
mongoose.connect(db.URI);

let mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console,'Connection error:'));
mongodb.once('open',()=>{
  console.log('Connected to MongoDb');
})

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactRouter = require('../routes/contact');
let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use(session({
  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

//passport user config
let userModel = require("../models/user");
let user = userModel.User;

passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = db.Secret;

let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  user.findById(jwt_payload.id)
    .then(user => {
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    });
});

passport.use(strategy);

//rotuing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/business-contact-list',contactRouter);

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
  res.render('error',{ title: 'Error'});
});

module.exports = app;
