const {Users} = require('../models')


async function findData(id) {
  try {
    user = await Users.findOne({where: { id: id }})
    return user.dataValues
  } catch (err) {
    console.log(err)
  }
}

module.exports = { 
  async getImgurKey (req,res) {
    try {
        res.status(200).send({
          success: process.env.IMGUR_KEY
        })
      } catch (err) {
        res.status(400).send({
          error: 'Cannot Return Key'
        })
      }
    },
  async uploadProfileImg (req,res) {
    try {
      Users.update(
        {avatar: req.body.link},
        {where: {email: req.session.user }}
      ).then(
        res.status(200).send({
          response: "Successfully Updated Img"
        })
      )
    } catch (err) {
      res.status(200).send({
        error: 'Cannot Update Img'
      })
    }
  },
  async getProfileData (req,res) {
    try {
      const user = await Users.findOne({
        where: { email: req.session.user }
      })
      if (user === "Guest") {
        res.status(200).send({
          success: 'You need to login'
        })
      } else {
        res.status(200).send({
          email: user.email,
          group: user.group,
          name: user.name,
          avatar: user.avatar
        })
      }
    } catch (err) {
      res.status(200).send({
        error: 'User not found'
      })
    }
  },
  async inputName (req,res) {
    console.log(req.body.name)
    try {
      Users.update(
        {name: req.body.name},
        {where: {email: req.session.user }}
      ).then(
        res.status(200).send({
          response: "Successfully Updated name"
        })
      )
    } catch (err) {
      res.status(200).send({
        error: 'User not found'
      })
    }
  },
  async getAllFriends (req,res) {
    const allFriendData = []
    try {
      const user = await Users.findOne({
        where: { email: req.session.user }
      })
        console.log(user.group) //Having an issue that basically the user.group returns the user group values, when I iterate through them it returns the place values of each value in the string...
        const friends = user.group
        for (friend in friends) {
          console.log(friend)
          if (friend !== "0") {
            allFriendData.push( await findData(friend))
          }
        }
      res.status(200).send({
        data : allFriendData
      })
    } catch (err) {
      console.log(err)
    }
  }
}