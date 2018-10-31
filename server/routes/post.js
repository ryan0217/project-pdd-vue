const express = require('express');
const router = express.Router();
const md5 = require("blueimp-md5");
const {sendRes, filterUserInfo}  = require('../util');
const User = require('../models/User');

// 用户登录
router.post('/user/login', (req, res) => {
  let {type, phone, phoneSms, password} = req.body;
  if (type === 'sms') { // 用户使用验证码登录
    if (req.session.phoneSms !== phoneSms) {
      res.json({ status: 0, msg: '验证码错误' });
    } else {
      delete req.session.phoneSms;
      User.find({phone}, (err, data) => {
        if (err) {
          res.json({status: 0, msg: err.message});
        }
        data = data[0];
        if (!data) { // 用户未注册，自动注册，返回用户信息
          User.create({ phone, password, username: phone, sex: '', address: '', birth: '', signature: '', cart: [] }, (err, data) => {
            data = filterUserInfo(data);
            req.session.userId = data._id;
            sendRes(err, res, data);
          });
        } else { // 用户已注册，返回用户信息
          data = filterUserInfo(data);
          req.session.userId = data._id;
          sendRes(err, res, data);
        }
      });
    }
  } else { // 用户使用密码登录
    password = md5(password);
    User.find({phone}, (err, data) => {
      if (err) {
        res.json({status: 0, msg: err.message});
      }
      data = data[0];
      if (!data) { // 用户未注册，自动注册，返回用户信息
        User.create({ phone, password, username: phone, sex: '', address: '', birth: '', signature: '', cart: [] }, (err, data) => {
          data = filterUserInfo(data);
          req.session.userId = data._id;
          sendRes(err, res, data);
        });
      } else { // 用户已注册
        if (!data.password) { // 用户未设置密码
          User.update({phone}, {password}, (err) => {
            if (err) {
              res.json({status: 0, msg: err.message});
            }
            data = filterUserInfo(data);
            req.session.userId = data._id;
            sendRes(err, res, data);
          });
        } else { // 用户设置了密码
          User.find({phone, password}, (err, data) => {
            if (err) {
              res.json({status: 0, msg: err.message});
            }
            data = data[0];
            if (!data) { // 密码错误
              res.json({status: 0, msg: '账号或密码错误，请重试'});
            } else { // 密码正确
              data = filterUserInfo(data);
              req.session.userId = data._id;
              sendRes(err, res, data);
            }
          })
        }
      }
    });
  }
});

module.exports = router;