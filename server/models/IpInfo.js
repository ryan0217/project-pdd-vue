const mongoose = require('mongoose');

const IpInfo = new mongoose.Schema({
  ip: String,
  user_agent: String,
  time: String
});

module.exports = mongoose.model('ip_info', IpInfo);