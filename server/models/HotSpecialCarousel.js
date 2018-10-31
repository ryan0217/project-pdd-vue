const mongoose = require('mongoose');

const HotSpecialCarousel = new mongoose.Schema({
  imgUrl: String,
  title: String
});

module.exports = mongoose.model('hot_special_carousel', HotSpecialCarousel);