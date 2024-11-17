const mongoose = require('mongoose');

const TodoScheme = mongoose.Schema({
  _id: String,
  name: String,
  completed: Boolean
});

module.exports = TodoScheme;
