var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var MenuBarRouter = require('./routes/MenuBar');
var MindMapRouter = require('./routes/MindMap');
var AccountSetRouter = require('./routes/AccountSet');
var TaskAddRouter = require('./routes/TaskAdd');
var TaskEditRouter = require('./routes/TaskEdit');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/MenuBar', MenuBarRouter);
app.use('/MindMap', MindMapRouter);
app.use('/AccountSet', AccountSetRouter);
app.use("/TaskAdd", TaskAddRouter);
app.use("/TaskEdit", TaskEditRouter);

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

//CORSを許可する処理を追加
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

// DBとORM連携
const db = require("./database/models");
db.sequelize.sync({ force: false }).then(() => {
  console.log("DB 起動");
});

//追加
app.use('/img', express.static(__dirname + '/public/img/'));
app.use('/css', express.static(__dirname + '/public/css/'));
app.use('/js', express.static(__dirname + '/public/js/'));

module.exports = app;
