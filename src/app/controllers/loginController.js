const User = require("../models/User")

const login = async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (!user) {
    return res.render('login', { error_code: true, message: "User has not been registed yet" })
  }
  const validUser = await bcrypt.compare(password, user.password_hash)
  if (validUser) {
    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET)
    return res.render('login', { error_code: false, message: "User logged in !!", token, full_name: user.full_name })
  } else {
    return res.render('login', { error_code: false, message: "Incorrect password" })
  }
}

module.exports = { login }