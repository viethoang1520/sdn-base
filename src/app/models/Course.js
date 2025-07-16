const mongoose = require("mongoose");
const Course = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  }
}, {
  timestamps: true, // tự động thêm createdAt và updatedAt
  freezeTableName: true,
})

module.exports = mongoose.model('Courses', Course)