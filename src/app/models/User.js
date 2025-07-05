const mongoose = require("mongoose");

// Model initalization example
const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add extra fields below

}, {
  timestamps: true
})

module.exports = mongoose.model('users', User)