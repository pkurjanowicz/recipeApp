const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationConrollerPolicy')
const ProfileController = require('./controllers/ProfileController')
const RecipesController = require('./controllers/RecipesController')
const CommentController = require('./controllers/CommentController')
const addAdditionalPhotoController = require('./controllers/AdditionalPhotoController')
const ScraperController = require('./controllers/ScraperController')
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
  app.post('/addRecipe', RecipesController.addRecipe)
  app.get('/getAllRecipes', RecipesController.getAllRecipes)
  app.post('/getSingleRecipe', RecipesController.getSingleRecipe)
  app.get('/getUserRecipes', RecipesController.getUserRecipes)
  app.post('/likeRecipe', RecipesController.likeRecipe)
  app.get('/getLikedRecipes', RecipesController.getLikedRecipes)
  app.post('/getFriendRecipes', RecipesController.getFriendRecipes)
  app.post('/addComment', CommentController.addComment)
  app.post('/getComments', CommentController.getComments)
  app.post('/addAdditionalPhoto', addAdditionalPhotoController.addAdditionalPhoto)
  app.post('/getAllPhotosById', addAdditionalPhotoController.getAllPhotosById)
  app.post('/updateRecipe', RecipesController.updateRecipe)
  app.get('/getLoggedInEmail', RecipesController.getLoggedInEmail)
  app.get('/findUserInfo', ProfileController.findUserInfo)
  app.post('/unlikeRecipe', RecipesController.unlikeRecipe)
  app.post('/scrapeUrl', ScraperController.scrapeSite)
}
