const mongoose = require('mongoose');
const TodoScheme = require('../schemes/todo.schemes');

const TodoModel = mongoose.model('Todo', TodoScheme, 'tasks');

module.exports = TodoModel;
