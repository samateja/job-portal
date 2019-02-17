var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request');
var sassMiddleware = require('node-sass-middleware')
var browserify = require('browserify-middleware');
var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');
var pollRouter = require('./routes/poll');
var engine = require('ejs-locals');
var fs = require('fs');
var config = require('./bin/config.json');
// var bodyParser = require('body-parser');
var app = express();
var port = process.env.NODE_PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('assets', path.join(__dirname + '/src', 'assets'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/javascripts/bundle.js', browserify('./public/bundle.js'));
// app.use('/js', browserify(__dirname + '/public'));
app.use(sassMiddleware({
  src: path.join(__dirname, 'stylesheets'),
  dest: path.join(__dirname , 'public'),
  outputStyle: 'compressed',
  debug: true,
  force: true
}));
app.use('/images', express.static(__dirname + '/images'));

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/poll', pollRouter);

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
  res.render('error.ejs');
});

app.use('/public', express.static(path.join(__dirname, 'public')));

//Create a directory for search results
let dir = __dirname + '/' + config.searchResultsDir;
!fs.existsSync(dir) && fs.mkdirSync(dir);

app.listen(port, () => console.log('App listenng on port ' + port ))
module.exports = app;
