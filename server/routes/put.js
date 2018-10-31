const express = require('express');
const router = express.Router();
const {sendRes, filterUserInfo}  = require('../util');
const User = require('../models/User');

// 修改用户信息
router.put('/user/info', (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    res.json({status: 0, msg: '用户未登录'});
  } else {
    User.update({_id: userId}, req.body, (err) => {
      if (err) {
        res.json({status: 0, msg: err.message});
      } else {
        User.find({_id: userId}, (err, data) => {
          data = filterUserInfo(data[0]);
          sendRes(err, res, data);
        });
      }
    });
  }
});

// 操作购物车
router.put('/cart', (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    res.json({status: 0, msg: '用户未登录'});
  } else {
    let {goods, type, operate} = req.body;
    User.findById(userId, (err, data) => {
      if (err) {
        res.json({status: 0, msg: err.message});
      } else {
        let cart = JSON.parse(JSON.stringify(data.cart));
        if (goods === 'all' && type === 'checked') {
          cart.forEach((item) => item.goods_checked = operate);
        } else {
          let flag = true;
          for (let i = 0; i < cart.length; i++) {
            let cur = cart[i];
            if (cur.goods_id === goods.goods_id) {
              flag = false;
              if (type === 'num') {
                cur.goods_num = parseInt(cur.goods_num);
                cur.goods_num = operate === 'increase' ? (cur.goods_num + 1) : (cur.goods_num - 1);
              } else if (type === 'remove') {
                cart.splice(i, 1);
              } else if (type === 'checked') {
                cur.goods_checked = operate === true;
              }
              break;
            }
          }
          if (flag) { // 商品是新添加的
            goods.goods_num = 1;
            goods.goods_checked = true;
            cart.push(goods);
          }
        }
        User.findByIdAndUpdate(userId, {cart}, (err) => {
          sendRes(err, res, '操作购物车成功');
        });
      }
    });
  }
});

module.exports = router;
