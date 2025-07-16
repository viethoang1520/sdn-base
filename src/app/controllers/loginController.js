const Member = require("../models/Member")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await Member.findOne({ username })
    if (!user) {
      return res.json({ error: true, message: "User has not been registed yet" })
    }
    const validUser = await bcrypt.compare(password, user.password)
    if (validUser) {
      const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET)
      return res.json({ error: false, message: "User logged in !!", token })
    } else {
      return res.json({ error: false, message: "Incorrect password" })
    }
  } catch (error) {
    console.log(error)
  }

}

const loginWithHandlebarsAPI = async (req, res) => {
  const { username, password } = req.body
  const user = await Member.findOne({ username })
  if (!user) {
    return res.json({ error: true, message: "User has not been registed yet" })
  }
  const validUser = await bcrypt.compare(password, user.password_hash)
  if (validUser) {
    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET)
    return res.json({ error: false, message: "User logged in !!", token, })
  } else {
    return res.json({ error: false, message: "Incorrect password" })
  }
}
// -----------------------------------------------------------------------------
// Login functions with views
const renderLogin = async (req, res) => {
  try {
    res.render('login')
  } catch (error) {
    console.log(error)
  }
}

const loginWithViewsAPI = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await Member.findOne({ username })
    if (!user) {
      return res.render('login',{ error: true, message: "User has not been registed yet" })
    }
    const validUser = await bcrypt.compare(password, user.password)
    if (validUser) {
      const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET)
      // return res.render('section',{ error: false, message: "User logged in !!", token })
      req.session.token = token
      res.redirect('/view/sections')
    } else {
      return res.render('login',{ error: false, message: "Incorrect password" })
    }
  } catch (error) {
    console.log(error)
  }
}





module.exports = { login, loginWithHandlebarsAPI, renderLogin, loginWithViewsAPI }