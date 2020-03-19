module.exports = (sequelize, DataTypes) => {
  var Recipes = sequelize.define('Recipes', {
    title: DataTypes.STRING,
    writer: DataTypes.STRING,
    cook_time: DataTypes.STRING,
    prep_time: DataTypes.STRING,
    type: DataTypes.STRING,
    servings: DataTypes.STRING,
    description: DataTypes.STRING,
    ingredients: DataTypes.ARRAY(DataTypes.STRING), 
    steps: DataTypes.ARRAY(DataTypes.STRING),
    photo: DataTypes.STRING,
    likes: DataTypes.INTEGER,
  })
  return Recipes;
};