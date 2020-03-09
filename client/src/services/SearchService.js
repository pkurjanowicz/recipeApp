import Api from './Api'

export default {
  search (email) {
    return Api().post('search', email)
  }
}