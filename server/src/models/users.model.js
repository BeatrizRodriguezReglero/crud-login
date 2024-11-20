const mongoose = require('mongoose');
const UserScheme = require('../schemes/users.scheme');

const UserModel = mongoose.model('User', UserScheme);
module.exports = UserModel;
