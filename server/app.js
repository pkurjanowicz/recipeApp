var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var history = require('connect-history-api-fallback');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session')
const FileStore = require('session-file-store')(session)

var app = express();

app.use(history());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors())
app.use(session({
  name:'session-id',
  secret:'!.Pz-@h_frMpt9v',
  saveUninitialized:false,
  resave:false,
  store:new FileStore({path : 'server/sessions'})
}))

app.use('/', indexRouter);
require('./routes')(app)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

});

module.exports = app;
