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
        const friends = user.group.split(',')
        for (i = 0; i < friends.length; i++) {
          console.log(friends[i])
          allFriendData.push( await findData(friends[i]))
        }
      res.status(200).send({
        data : allFriendData
      })
    } catch (err) {
      console.log(err)
    }
  },
  async findUserInfo (req, res) {
    try {
      const user = await Users.findOne({
        where: { email: req.session.user }
      }) 
      res.status(200).send({
        data : user
      })
    } catch (err) {
      console.log(err)
    }
  }
}