import Api from './Api'

export default {
  addComment (comment) {
    return Api().post('addComment', comment)
  },
  getComments(id) {
    return Api().post('getComments', id)
  }
}