module.exports = (sequelize, DataTypes) => {
  var Comments = sequelize.define('Comments', {
    writer: DataTypes.STRING,
    comment: DataTypes.STRING,
    recipe_id: DataTypes.INTEGER,
  })
  return Comments;
};