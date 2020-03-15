const {Users} = require('../models')

module.exports = { 
  async getImgurKey (req,res) {
    try {
      res.status(200).send({
        success: process.env.IMGUR_KEY
      })
      } catch (err) {
        res.status(400).send({
          error: 'Cannot Return Key'
        })
      }
    },
}