const path = require("path");

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir: path.resolve(__dirname, "../server/dist/static"),
  assetsDir: ".",
  indexPath: "../index.html",
  publicPath: '/static'
}