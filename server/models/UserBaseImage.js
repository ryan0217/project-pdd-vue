const mongoose = require('mongoose');

const UserBaseImage = new mongoose.Schema({
  type: String,
  imgUrl: String
});

module.exports = mongoose.model('user_base_image', UserBaseImage);