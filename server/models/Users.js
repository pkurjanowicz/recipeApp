module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    group: DataTypes.STRING,
    avatar: DataTypes.STRING,
    name: DataTypes.STRING,
  })
  return Users;
};