const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationConrollerPolicy')
const ProfileController = require('./controllers/ProfileController')
const RecipesController = require('./controllers/RecipesController')
const auth = require('./controllers/auth')


module.exports = (app) => {
  app.post('/register', AuthenticationControllerPolicy.register,AuthenticationController.register)
  app.post('/login', AuthenticationController.login)
  app.get('/auth', auth)
  app.get('/logout', AuthenticationController.logout)
  app.get('/loginGuest', AuthenticationController.loginGuest)
  app.post('/search', AuthenticationController.search)
  app.post('/addUserToGroup',AuthenticationController.addUserToGroup)
  app.get('/getImgurSecret', ProfileController.getImgurKey)
  app.post('/uploadProfileImg',ProfileController.uploadProfileImg)
  app.get('/getProfileData', ProfileController.getProfileData)
  app.post('/inputName', ProfileController.inputName)
  app.get('/getAllFriends', ProfileController.getAllFriends)
}
