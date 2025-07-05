const login = require('./login')

function routes(app) {
  app.use('/login', login)
}

module.exports = routes