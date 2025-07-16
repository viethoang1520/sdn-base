const mongoose = require("mongoose");
const Member = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // tự động thêm createdAt và updatedAt
  freezeTableName: true,
})

module.exports = mongoose.model('Members', Member)