const {Users} = require('../models')
const {Addtionalphotos} = require('../models')

module.exports = { 
  async addAdditionalPhoto (req, res) {
    try {
      if (req.session.user !== "Guest") {
        const user = await Users.findOne({
          where: { email: req.session.user }
        })
        await Addtionalphotos.create({
          writer: user.email,
          photo: req.body.photo,
          recipe_id: req.body.recipe_id
        })
        res.status(200).send({
          success: "Successfully added photo"
        })
      } else {
        res.status(200).send({
          success: "You must be logged in to submit a photo"
        })
        }
      } catch (err) {
      console.log(err)
    }
  },
  async getAllPhotosById (req, res) {
    try {
      const response = await Addtionalphotos.findAll({
        where: {recipe_id: req.body.id}
      })
      res.status(200).send({
        success: response
      })
    } catch (err) {
      console.log(err)
    }
  }
}