const mongoose = require('mongoose');

const HotNav = new mongoose.Schema({
  imgUrl: String,
  title: String
});

module.exports = mongoose.model('hot_nav', HotNav);