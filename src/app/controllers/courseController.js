const MainModel = require('../models/Course')
const SubModel = require('../models/Section')
const getAllItem = async (req, res) => {
  try {
    const allItems = await MainModel.find({})
    res.json(allItems)
  } catch (error) {
    console.log(error)
  }
}

const createItem = async (req, res) => {
  try {
    const { courseName, courseDescription } = req.body
    console.log(courseName, courseDescription)
    const newItem = new MainModel({
      courseName, courseDescription
    })
    console.log(newItem)
    const savedItem = await newItem.save()
    res.json(savedItem)
  } catch (error) {
    console.log(error)
  }
}

const updateItem = async (req, res) => {
  try {
    const { id } = req.params
    const { courseName, courseDescription } = req.body
    const updateItem = await MainModel.findByIdAndUpdate(id, {
      courseName,
      courseDescription
    }, {
      new: true
    })
    res.json(updateItem)

  } catch (error) {
    console.log(error)
  }
}

const deleteItem = async (req, res) => {
  const { id } = req.params
  const existingRefObject = await SubModel.findOne({ course: id })
  if (existingRefObject != null) {
    res.json({ 'message': "Cannot delete" })
  } else {
    await MainModel.findByIdAndDelete(id)
    res.json('Delete sucessfully')
  }
}

module.exports = { getAllItem, createItem, updateItem, deleteItem }