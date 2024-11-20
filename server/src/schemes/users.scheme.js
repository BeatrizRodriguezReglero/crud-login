const { mongoose } = require('mongoose');
const UserScheme = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: false
    },
    image: {
      type: String,
      default: null,
      required: false
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);
module.exports = UserScheme;
