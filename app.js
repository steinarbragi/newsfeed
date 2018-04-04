require('dotenv').config()

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require("mongodb");
var xhub = require('express-x-hub');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');


//var listings = require('./routes/listings');
//var user = require('./routes/user');

var news = require('./routes/news');
var crawl = require('./routes/crawl');


var app = express();


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*'); //TODO: don't use wildcard

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var db;

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jsx');
//app.use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(authCheck);
app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});


//Connect to database and start server
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  var exposeDb = function(req, resp, next){
    req.mongoDb = db;
    next();
  };

  app.use('/api/news', exposeDb, news);
  app.use('/api/crawl', exposeDb, crawl);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
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
    res.json(err);
  });

});





module.exports = app;
