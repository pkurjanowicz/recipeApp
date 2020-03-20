const {Recipes} = require('../models')
const {Users} = require('../models')


async function findData(id) {
  try {
    recipe = await Recipes.findOne({where: { id: id }})
    return recipe.dataValues
  } catch (err) {
    console.log(err)
  }
}


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
  },
  async likeRecipe (req,res) {
    try {
      const user = await Users.findOne({
        where: { email: req.session.user }
      })
      if (req.session.user === "Guest") {
        res.status(200).send({
          response: "You Need to Login to Like a Recipe"
        })
      } else if (user.liked_recipes === null) {
        Users.update(
          {liked_recipes: req.body.id},
          {where: {email: req.session.user }}
        ).then(
          res.status(200).send({
            response: "Successfully Liked Recipe"
          })
        ) 
      } else if (user.liked_recipes.includes(req.body.id)) {
        res.status(200).send({
          response: "Recipe Already Liked"
        })
      } else {
        Users.update(
          {liked_recipes: user.liked_recipes + "," + req.body.id},
          {where: {email: req.session.user }}
        ).then(
          res.status(200).send({
            response: "Successfully Liked Recipe"
          })
        )
      }
    } catch (err) {
      res.status(200).send({
        response: 'Unable to like recipe'
      })
    }
  },
  async getLikedRecipes (req, res) {
    const allLikedRecipes = []
    try {
      const user = await Users.findOne({
        where: { email: req.session.user }
      })
      const recipes = user.liked_recipes.split(',')
      for (i = 0; i < recipes.length; i++) {
        console.log(recipes[i])
        allLikedRecipes.push( await findData(recipes[i]))
      }
      res.status(200).send({
        success: allLikedRecipes
      })
    } catch (err) {
      console.log(err)
    }
  },
  async getFriendRecipes (req, res) {
    try {
      const friend = await Users.findOne({
        where: { id : req.body.id }
      })
      const recipes = await Recipes.findAll({
        where: { writer : friend.email}
      })
      console.log(recipes)
      res.status(200).send({
        success: recipes
      })
    } catch (err) {
      console.log(err)
    }
  }
}
