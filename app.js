const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var mongoose = require('mongoose');

// mongodb connection
mongoose.connect('mongodb://localhost:27017/ipsumDB', {useNewUrlParser: true});
const db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error'));

// set bodyParsers to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false })); // for use with querystrings

// serve static files from /public
app.use(express.static(__dirname + '/public'));   // __dirname refers to the file path from the server's root to our applications root folder

// view engine setup
app.set('view engine', 'pug');

// include routes
const routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next){
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

// listen on port 5000
app.listen(5000, function(){
  console.log('\n  *  *  *  LoremExpress running on port 5000  *  *  *\n');
});