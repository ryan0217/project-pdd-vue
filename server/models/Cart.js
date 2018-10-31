const mongoose = require('mongoose');

const Cart = new mongoose.Schema({
  userId: String,
  cart: [
    {
      goods_id: String,
      goods_name: String,
      goods_url: String,
      goods_price: String,
      goods_num: String,
      goods_checked: Boolean
    }
  ]
});

module.exports = mongoose.model('cart', Cart);