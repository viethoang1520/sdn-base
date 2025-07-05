const express = require('express')
const router = express.Router()
const { login } = require('../app/controllers/loginController')

// Render hbs page
router.get('/', (req, res) => {
  res.render('login')
})

// Send login request
router.post('/', login)

module.exports = router