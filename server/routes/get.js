const express = require('express');
const router = express.Router();
const { sendRes, filterUserInfo } = require('../util');
const HotCarousel = require('../models/HotCarousel');
const HotNav = require('../models/HotNav');
const HotSpecialCarousel = require('../models/HotSpecialCarousel');
const HotAd = require('../models/HotAd');
const HotList = require('../models/HotList');
const RecommendList = require('../models/RecommendList');
const SearchList = require('../models/SearchList');
const GoodsList = require('../models/GoodsList');
const UserBaseImage = require('../models/UserBaseImage');
const User = require('../models/User');
const IpInfo = require('../models/IpInfo');

let saveIpInfo = function (req) {
  let ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  if (ip.split(',').length > 0) {
    ip = ip.split(',')[0];
  }
  if (ip.includes('::ffff:')) {
    ip = ip.slice(7);
  }
  let user_agent = req.headers['user-agent'];
  let time = new Date();
  time = (time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()).replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2')
  if (ip !== '127.0.0.1' && ip !== '27.18.125.187') {
    IpInfo.create({ip, user_agent, time});
  }
};

// 获取首页轮播图
router.get('/home/hotCarousels', (req, res) => {
  HotCarousel.find({}, (err, data) => {
    sendRes(err, res, data);
  });
});

// 获取首页导航
router.get('/home/hotNavs', (req, res) => {
  HotNav.find({}, (err, data) => {
    sendRes(err, res, data);
  });
});

// 获取首页特价轮播图
router.get('/home/hotSpecialPriceCarousels', (req, res) => {
  HotSpecialCarousel.find({}, (err, data) => {
    sendRes(err, res, data);
  });
});

// 获取首页广告图
router.get('/home/hotAds', (req, res) => {
  HotAd.find({}, (err, data) => {
    sendRes(err, res, data);
  });
});

// 获取首页商品列表
router.get('/home/hotGoodsList', (req, res) => {
  saveIpInfo(req);
  HotList.find({}, (err, data) => {
    sendRes(err, res, data);
  });
});

// 获取推荐页商品列表
router.get('/recommend/goodsList', (req, res) => {
  RecommendList.find({}, (err, data) => {
    sendRes(err, res, data);
  });
});

// 获取更多商品
router.get('/recommend/moreGoods', (req, res) => {
  let offset = parseInt(req.query.offset);
  let limit = parseInt(req.query.limit);
  GoodsList.find({})
    .skip(offset)
    .limit(limit)
    .exec((err, data) => {
      sendRes(err, res, data);
    });
});

// 获取搜索页商品列表
router.get('/search/goodsList', (req, res) => {
  SearchList.find({}, (err, data) => {
    sendRes(err, res, data);
  });
});

// 获取个人中心页基本图片
router.get('/user/baseImages', (req, res) => {
  UserBaseImage.find({}, (err, data) => {
    sendRes(err, res, data);
  });
});

// 获取短信验证码
router.get('/user/phoneSms', (req, res) => {
  let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let result = '';
  for (let i = 0; i < 4; i++) {
    let index = Math.floor(Math.random() * 10);
    result += chars[index];
  }
  // 保存用户手机号对应的验证码信息
  req.session.phoneSms = result;
  sendRes(null, res, result);
});

// 获取用户信息
router.get('/user/info', (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    res.json({status: 0, msg: '用户未登录'});
  } else {
    User.find({_id: userId}, (err, data) => {
      if (err) {
        res.json({status: 0, msg: err.message});
      }
      data = data[0];
      if (!data) {
        delete req.session.userId;
        res.json({status: 0, msg: '用户不存在，请重新登陆'});
      } else {
        data = filterUserInfo(data);
        sendRes(err, res, data);
      }
    });
  }
});

// 退出登录
router.get('/user/logout', (req, res) => {
  delete req.session.userId;
  sendRes(null, res, '退出登录成功');
});

// 获取购物车
router.get('/cart', (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    res.json({status: 0, msg: '用户未登录'});
  } else {
    User.findById(userId, (err, data) => {
      sendRes(err, res, data.cart);
    });
  }
});

module.exports = router;