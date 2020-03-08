const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationConrollerPolicy')
const auth = require('./controllers/auth')


module.exports = (app) => {
  app.post('/register', 
  AuthenticationControllerPolicy.register,
  AuthenticationController.register)
  app.post('/login', 
  AuthenticationController.login)
  app.get('/auth', auth)
  app.get('/logout', AuthenticationController.logout)
}
