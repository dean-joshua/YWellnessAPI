const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  email: String,
  picture: String,
  age: Number,
  weight: Number,
  height: String,
  goal: String,
  yourWhy: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
