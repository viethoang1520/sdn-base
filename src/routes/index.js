const mainRouter = require('./mainRouter')

function routes(app) {
  app.use('/', mainRouter)
}

module.exports = routes