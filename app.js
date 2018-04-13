const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');

require('express-async-errors');

const createRouter = require('./routes');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

console.log("@@@@@@@@", process.env.MONGODB_MAROON_URI);

mongoose.connect(process.env.MONGODB_MAROON_URI || 'mongodb://localhost/test')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

const app = express();
let authenticator = (req, res, next) => { next(); };

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', createRouter(authenticator));

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
