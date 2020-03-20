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
  }
}