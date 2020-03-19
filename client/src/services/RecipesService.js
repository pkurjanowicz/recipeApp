import Api from './Api'

export default {
  addRecipe(info) {
    return Api().post('addRecipe', info)
  },
  getAllRecipes() {
    return Api().get('getAllRecipes')
  }
}