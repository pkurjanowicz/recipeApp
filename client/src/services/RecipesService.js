import Api from './Api'

export default {
  addRecipe(info) {
    return Api().post('addRecipe', info)
  },
  getAllRecipes() {
    return Api().get('getAllRecipes')
  },
  getSingleRecipe(id) {
    return Api().post('getSingleRecipe', id)
  },
  getUserRecipes() {
    return Api().get('getUserRecipes')
  },
  likeRecipe(id) {
    return Api().post('likeRecipe', id)
  },
  getLikedRecipes() {
    return Api().get('getLikedRecipes')
  },
  getFriendRecipes(id) {
    return Api().post('getFriendRecipes', id)
  },
  updateRecipe(data) {
    return Api().post('updateRecipe', data)
  },
  getLoggedInEmail() {
    return Api().get('getLoggedInEmail')
  },
  unlikeRecipe(id) {
    return Api().post('unlikeRecipe', id)
  }
}