var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var validator = require('express-validator');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://username:abcd1234@ds017193.mlab.com:17193/nodetest1')

const API_PORT = 3001;
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const user = require('./routes/user.route')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make db accessible to our router
app.use(function(req,res,next) {
  req.db = db;
  next();
});
db.once("open", () => console.log("connected to the database"));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', user);

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

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
