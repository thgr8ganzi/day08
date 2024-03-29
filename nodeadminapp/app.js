var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 모델 index.js 에서 sequelize 객체를 가져온다.
// node application 이 최초 실행시 mysql db 서버와 연결하고 테이블을 자동으로 생성한다
// model 폴더내 각종 모델 파일들을 참조하여 테이블을 생성한다.
const sequelize = require('./models/index').sequelize;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
sequelize.sync(); // 서버 실행시 mysql db 서버와 연결하고 테이블을 자동으로 생성한다

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
