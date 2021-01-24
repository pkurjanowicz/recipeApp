import Api from './Api'

export default {
  scrapeSite (url) {
    return Api().post('scrapeUrl', url)
  },
}