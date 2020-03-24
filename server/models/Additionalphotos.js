module.exports = (sequelize, DataTypes) => {
  var Addtionalphotos = sequelize.define('Addtionalphotos', {
    writer: DataTypes.STRING,
    photo: DataTypes.STRING,
    comment: DataTypes.STRING,
    recipe_id: DataTypes.INTEGER,
  })
  return Addtionalphotos;
};