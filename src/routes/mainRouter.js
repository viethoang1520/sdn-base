const express = require('express')
const router = express.Router()
const authenticateJWT = require('../middleware/AuthenticateJWT')
const authenticateWithHbs = require('../middleware/AuthenticateWithHbs')
const { login, renderLogin, loginWithViewsAPI } = require('../app/controllers/loginController')
const { getAllItem } = require('../app/controllers/courseController')
const { createItem } = require('../app/controllers/courseController')
const { updateItem } = require('../app/controllers/courseController')
const { deleteItem } = require('../app/controllers/courseController')
const {
  renderSection,
  renderAddSection,
  createSection,
  renderEditSection,
  updateSection,
  deleteSection
} = require('../app/controllers/sectionController')

router.post('/api/auth/login', login)
router.get('/api/courses', authenticateJWT, getAllItem)
router.post('/api/courses', authenticateJWT, createItem)
router.put('/api/courses/:id', authenticateJWT, updateItem)
router.delete('/api/courses/:id', authenticateJWT, deleteItem)

router.get('/view/auth/login', renderLogin)
router.post('/view/auth/login', loginWithViewsAPI)

// Section routes
router.get('/view/sections', authenticateWithHbs, renderSection)
router.get('/view/sections/add', authenticateWithHbs, renderAddSection)
router.post('/view/sections', authenticateWithHbs, createSection)
router.get('/view/sections/:id/edit', authenticateWithHbs, renderEditSection)
router.post('/view/sections/:id', authenticateWithHbs, updateSection)
router.post('/view/sections/:id/delete', authenticateWithHbs, deleteSection)

module.exports = router