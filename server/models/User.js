const mongoose = require('mongoose');

const User = new mongoose.Schema({
  phone: String,
  password: String,
  username: String,
  sex: String,
  address: String,
  birth: String,
  signature: String,
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

module.exports = mongoose.model('user', User);