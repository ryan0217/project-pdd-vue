const mongoose = require('mongoose');

const RecommendList = new mongoose.Schema({
  goods_id: Number,
  goods_name: String,
  short_name: String,
  thumb_url: String,
  hd_thumb_url: String,
  image_url: String,
  is_app: Number,
  event_type: Number,
  goods_type: Number,
  customer_num: Number,
  sales: Number,
  price: Number,
  normal_price: Number,
  market_price: Number,
  min_on_sale_group_price: Number,
  mall_id: Number,
  sales_tip: String,
  p_rec: {
    t: String,
    g: String,
    bk: String,
    source: String
  }
});

module.exports = mongoose.model('recommend_list', RecommendList);