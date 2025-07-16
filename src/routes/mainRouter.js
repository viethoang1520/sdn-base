const express = require('express')
const router = express.Router()
const authenticateJWT = require('../middleware/AuthenticateJWT')
const { login } = require('../app/controllers/loginController')
const { getAllItem } = require('../app/controllers/courseController')
const { createItem } = require('../app/controllers/courseController')
const { updateItem } = require('../app/controllers/courseController')
const { deleteItem } = require('../app/controllers/courseController')


router.post('/api/auth/login', login)
router.get('/api/courses', authenticateJWT, getAllItem)
router.post('/api/courses', authenticateJWT, createItem)
router.put('/api/courses/:id', authenticateJWT, updateItem)
router.delete('/api/courses/:id', authenticateJWT, deleteItem)

module.exports = router