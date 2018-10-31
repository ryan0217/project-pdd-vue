const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const getRouter = require('./routes/get');
const postRouter = require('./routes/post');
const putRouter = require('./routes/put');
const deleteRouter = require('./routes/delete');
const indexRouter = require('./routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

// 使用session
const session = require('express-session');
app.use(session({
  secret: 'secret', // 对session id相关的cookie进行签名
  resave: false, // 是否重复保存
  saveUninitialized: true, // 是否保存未初始化的会话
  cookie: {maxAge: 24 * 60 * 60 * 1000}, // 设置session的有效时间，单位是毫秒
}));

// 连接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://******/vue-pdd', {
  useNewUrlParser: true
}, (err) => {
  err ? console.log('数据库连接失败') : console.log('数据库连接成功');
});

app.use('/GET', getRouter);
app.use('/POST', postRouter);
app.use('/PUT', putRouter);
app.use('/DELETE', deleteRouter);
app.use('/', indexRouter);

module.exports = app;