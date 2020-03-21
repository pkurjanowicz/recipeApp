import Api from './Api'

export default {
  addAdditionalPhoto (photo) {
    return Api().post('addAdditionalPhoto', photo)
  },
}