var express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
var logger = require('morgan');
const path = require('path');
//routers
var indexRouter = require('./routes');
var usersRouter = require('./routes/users');
var filesRouter = require('./routes/files');
var shareLinksRouter = require('./routes/share-links');
var app = express();
//middlewares
app.use(logger('dev'));
app.use(cors({
  exposedHeaders: "*"
}));
app.use(helmet());
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
//routers
app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/files', filesRouter);
app.use('/api/share-links', shareLinksRouter);

// Passport
require('./config/passport')(passport);
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send({
    'error': 'error bad request'
  });
});
// Production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    console.log(req.params);
    console.log(req.params);
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
module.exports = app;
