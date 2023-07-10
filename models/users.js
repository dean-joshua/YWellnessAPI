const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  given_name: String,
  name: String,
  email: String,
  picture: String,
  weight: Number,
  height: String,
  goal: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
