const mongoose = require("mongoose");
const Section = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
  },
  sectionDescription: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  isMainTask: {
    type: Boolean,
    default: false,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courses',
    required: true,
  },
}, {
  timestamps: true, // tự động thêm createdAt và updatedAt
  freezeTableName: true,
})

module.exports = mongoose.model('Sections', Section)