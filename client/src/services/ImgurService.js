import Api from './Api'

export default {
  getImgurSecret () {
    return Api().get('getImgurSecret')
  },
  getProfileData() {
    return Api().get('getProfileData')
  },
  inputName(name) {
    return Api().post('inputName', name)
  },
  getAllFriends() {
    return Api().get('getAllFriends')
  }
}