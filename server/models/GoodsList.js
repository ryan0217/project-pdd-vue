const mongoose = require('mongoose');

const GoodsList = new mongoose.Schema({
  goods_id: Number,
  goods_name: String,
  short_name: String,
  image_url: String,
  thumb_url: String,
  hd_thumb_url: String,
  is_app: Number,
  event_type: Number,
  cnt: Number,
  market_price: Number,
  normal_price: Number,
  country: String,
  allowed_region: String,
  region_limit: Number,
  is_assist: Number,
  assist_count: Number,
  has_mall_coupon: Number,
  group: {
    price: Number,
    customer_num: Number
  },
  p_rec: {
    t: String,
    g: String,
    bk: String,
    m: String
  }
});

module.exports = mongoose.model('goods_list', GoodsList);