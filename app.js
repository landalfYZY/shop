var jsdom = require('jsdom');
 
const {JSDOM} = jsdom;
const {document} = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
global.window = document.defaultView;
global.jQuery = require('jquery')(window);
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');
var goodsRouter = require('./routes/goods');
var cartsRouter = require('./routes/carts');
var collectionsRouter = require('./routes/collections');
var addressRouter = require('./routes/address');
var wuliuRouter = require('./routes/wuliu');
var wuliucompanyRouter = require('./routes/wuliucompany');
var fileRouter = require('./routes/file');
var richtextRouter = require('./routes/richtext');
var app = express();

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category',categoryRouter);
app.use('/goods',goodsRouter);
app.use('/carts',cartsRouter);
app.use('/collections',collectionsRouter);
app.use('/address',addressRouter);
app.use('/wuliu',wuliuRouter);
app.use('/wuliucompany',wuliucompanyRouter);
app.use('/file',fileRouter);
app.use('/richtext',richtextRouter);

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
