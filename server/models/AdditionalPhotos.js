module.exports = (sequelize, DataTypes) => {
  var additionalPhotos = sequelize.define('additionalPhotos', {
    writer: DataTypes.STRING,
    photo: DataTypes.STRING,
    comment: DataTypes.STRING,
  })
  return additionalPhotos;
};