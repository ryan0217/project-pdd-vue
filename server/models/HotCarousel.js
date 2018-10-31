const mongoose = require('mongoose');

const HotCarousel = new mongoose.Schema({
  imgUrl: String,
  detail: String
});

module.exports = mongoose.model('hot_carousel', HotCarousel);