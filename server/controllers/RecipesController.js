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
  },
  async getAllRecipes (req, res) {
    try {
      const recipes = await Recipes.findAll()
      res.status(200).send({
        success: recipes
      })
    } catch (err) {
      console.log(err)
    }
  },
  async getSingleRecipe (req, res) {
    try {
      const recipe = await Recipes.findOne({
        where: { id: req.body.id }
      })
      res.status(200).send({
        success: recipe
      })
    } catch (err) {
      console.log(err)
    }
  },
  async getUserRecipes (req, res) {
    try {
      const user = await Users.findOne({
        where: { email: req.session.user }
      })
      const recipes = await Recipes.findAll({
        where: { writer: user.email }
      })
      res.status(200).send({
        success: recipes
      })
    } catch (err) {
      console.log(err)
    }
  }
}
