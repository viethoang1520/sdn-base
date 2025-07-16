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
      return res.json({ error: false, message: "User logged in !!", token, full_name: user.full_name })
    } else {
      return res.json({ error: false, message: "Incorrect password" })
    }
  } catch (error) {
    console.log(error)
  }

}

const loginWithHandlebars = async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (!user) {
    return res.json({ error: true, message: "User has not been registed yet" })
  }
  const validUser = await bcrypt.compare(password, user.password_hash)
  if (validUser) {
    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET)
    return res.json({ error: false, message: "User logged in !!", token, full_name: user.full_name })
  } else {
    return res.json({ error: false, message: "Incorrect password" })
  }
}

module.exports = { login, loginWithHandlebars }