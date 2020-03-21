const {Users} = require('../models')
const {Addtionalphotos} = require('../models')

module.exports = { 
  async addAdditionalPhoto (req, res) {
    try {
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
    } catch (err) {
      console.log(err)
    }
  },
}