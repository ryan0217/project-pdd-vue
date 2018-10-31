const mongoose = require('mongoose');

const HotAd = new mongoose.Schema({
  imgUrl: String
});

module.exports = mongoose.model('hot_ad', HotAd);