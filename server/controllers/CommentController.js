const {Users} = require('../models')
const {Comments} = require('../models')

module.exports = { 
  async addComment (req, res) {
      try {
        if (req.session.user !== "Guest") {
          if (req.body.comment !== "") {
            const user = await Users.findOne({
              where: { email: req.session.user }
            })
            await Comments.create({
              writer: user.email,
              comment: req.body.comment,
              recipe_id: req.body.recipe_id
            })
            res.status(200).send({
              success: "Successfully added comment"
            })
          } else {
            res.status(200).send({
              success: "Please submit a message"
            })
          }
      } else {
        res.status(200).send({
          success: "You must be logged in to submit a comment"
        })
      } 
    } catch (err) {
      console.log(err)
    }
  },
  async getComments (req, res) {
    try {
      const recipeComments = await Comments.findAll({
        where: { recipe_id: req.body.recipe_id}
      })
      res.status(200).send({
        success: recipeComments
      })
    } catch (err) {
      console.log(err)
    }
  }
}