import Api from './Api'

export default {
  getImgurSecret () {
    return Api().get('getImgurSecret')
  },
}