const Section = require('../models/Section')
const Course = require('../models/Course')

const renderSection = async (req, res) => {
  try {
    const sections = await Section.find({}).populate('course').lean()
    res.render('section', { sections })
  } catch (error) {
    console.log(error)
    res.render('section', { sections: [], error: 'Failed to load sections' })
  }
}

const renderAddSection = async (req, res) => {
  try {
    const courses = await Course.find({}).lean()
    res.render('addSection', { courses })
  } catch (error) {
    console.log(error)
    res.render('addSection', { courses: [], error: 'Failed to load courses' })
  }
}

const createSection = async (req, res) => {
  try {
    const { sectionName, sectionDescription, duration, isMainTask, course } = req.body

    // Validate sectionName format
    const nameRegex = /^[a-zA-Z0-9\s]+$/
    if (!nameRegex.test(sectionName)) {
      const courses = await Course.find({}).lean()
      return res.render('addSection', {
        courses,
        error: 'Section name must only contain letters, numbers, and spaces',
        formData: req.body
      })
    }

    // Capitalize first letter of each word
    const formattedSectionName = sectionName.replace(/\b\w/g, l => l.toUpperCase())

    const newSection = new Section({
      sectionName: formattedSectionName,
      sectionDescription,
      duration: parseInt(duration),
      isMainTask: isMainTask === 'on',
      course
    })

    await newSection.save()
    res.redirect('/view/sections')
  } catch (error) {
    console.log(error)
    const courses = await Course.find({}).lean()
    res.render('addSection', {
      courses,
      error: 'Failed to create section',
      formData: req.body
    })
  }
}

const renderEditSection = async (req, res) => {
  try {
    const { id } = req.params
    const section = await Section.findById(id).populate('course').lean()
    const courses = await Course.find({}).lean()

    if (!section) {
      return res.redirect('/view/sections')
    }

    // Mark the selected course
    const coursesWithSelection = courses.map(course => ({
      ...course,
      selected: course._id.toString() === section.course._id.toString()
    }))

    res.render('editSection', {
      section,
      courses: coursesWithSelection
    })
  } catch (error) {
    console.log(error)
    res.redirect('/view/sections')
  }
}

const updateSection = async (req, res) => {
  try {
    const { id } = req.params
    const { sectionName, sectionDescription, duration, isMainTask, course } = req.body

    // Validate sectionName format
    const nameRegex = /^[a-zA-Z0-9\s]+$/
    if (!nameRegex.test(sectionName)) {
      const section = await Section.findById(id).populate('course').lean()
      const courses = await Course.find({}).lean()
      return res.render('editSection', {
        section,
        courses,
        error: 'Section name must only contain letters, numbers, and spaces'
      })
    }

    // Capitalize first letter of each word
    const formattedSectionName = sectionName.replace(/\b\w/g, l => l.toUpperCase())

    await Section.findByIdAndUpdate(id, {
      sectionName: formattedSectionName,
      sectionDescription,
      duration: parseInt(duration),
      isMainTask: isMainTask === 'on',
      course
    })

    res.redirect('/view/sections')
  } catch (error) {
    console.log(error)
    const section = await Section.findById(req.params.id).populate('course').lean()
    const courses = await Course.find({}).lean()
    res.render('editSection', {
      section,
      courses,
      error: 'Failed to update section'
    })
  }
}

const deleteSection = async (req, res) => {
  try {
    const { id } = req.params
    await Section.findByIdAndDelete(id)
    res.redirect('/view/sections')
  } catch (error) {
    console.log(error)
    res.redirect('/view/sections')
  }
}

module.exports = {
  renderSection,
  renderAddSection,
  createSection,
  renderEditSection,
  updateSection,
  deleteSection
}