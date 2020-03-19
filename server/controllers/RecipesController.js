const {Recipes} = require('../models')
const {Users} = require('../models')

module.exports = { 
  async addRecipe(req, res) {
    try {
      const user = await Users.findOne({
        where: { email: req.session.user }
      })
      const recipe = await Recipes.create({
        title: req.body.title,
        writer: user.email,
        cook_time: req.body.cook_time,
        prep_time: req.body.prep_time,
        type: req.body.type,
        servings: req.body.servings,
        description: req.body.description,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        photo: req.body.photo,
      })
      res.status(200).send({
        success: recipe
      })
    } catch (err) {
      console.log(err)
    }
  }
}
