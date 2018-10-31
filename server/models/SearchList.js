const mongoose = require('mongoose');

const SearchList = new mongoose.Schema({
  name: String,
  banner: String,
  tag: String,
  category: [
    {
      icon: String
    }
  ],
  items: [
    {
      icon: String,
      title: String
    }
  ]
});

module.exports = mongoose.model('search_list', SearchList);