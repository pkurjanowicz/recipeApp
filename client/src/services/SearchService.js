import Api from './Api'

export default {
  search (email) {
    return Api().post('search', email)
  },
  addUserToGroup (email) {
    return Api().post('addUserToGroup', email)
  },
  findUserInfo() {
    return Api().get('findUserInfo')
  }
}