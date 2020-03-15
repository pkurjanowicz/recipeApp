const {Users} = require('../models')
const crypto = require('crypto')

//helper functions to hash and check hash
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
  return [salt, hash].join('$');
  }

function verifyHash(password, original) {
  const originalHash = original.split('$')[1];
  const salt = original.split('$')[0];
  const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
  
  return hash === originalHash
  
  }

async function lookUpID(emailname) {
  try {
    id = await Users.findOne({where: { email: emailname }})
    return id.id
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  async register (req,res) {
    try {
      const user = await Users.create({
        email: req.body.email,
        password: await hashPassword(req.body.password)
      })
      res.send(user.toJSON())
      } catch (err) {
        res.status(400).send({
          error: 'This email account is already in use'
        })
      }
    },
    async login (req,res) {
      try {
        const user = await Users.findOne({
          where: { email: req.body.email }
        })
        if (verifyHash(req.body.password, user.password) === true) {
          req.session.user = req.body.email
          res.status(200).send({
            success: req.body.email
          })
        } else {
          res.status(400).send({
            error: 'Passwords do not match!'
          })
        }
      } catch (err) {
        res.status(400).send({
          error: 'User not found'
        })
      }
    },
    async logout (req,res) {
      try {
        req.session.user = null;
        res.status(200).send({
          response: 'Session destroyed'
        })
      } catch (err) {
        res.status(200).send({
          response: 'No session to destroy'
        })
      }
    },
    async loginGuest (req,res) {
      try {
        req.session.user = 'Guest'
        res.status(200).send({
          response: 'Success'
        })
      } catch (err) {
        res.status(200).send({
          response: 'Unable to login'
        })
      }
    },
    async search (req,res) {
      try {
        const user = await Users.findOne({
          where: { email: req.body.email }
        })
        res.status(200).send({
          response: user
        })
      } catch (err) {
        res.status(200).send({
          response: 'Unable to find user'
        })
      }
    },
    async addUserToGroup (req,res) {
      try {
        const user = await Users.findOne({
          where: { email: req.session.user }
        })
        if (user.group === null) {
          Users.update(
            {group: await lookUpID(req.body.email)},
            {where: {email: req.session.user }}
          ).then(
            res.status(200).send({
              response: "Successfully Added User"
            })
          )
        } else if (await lookUpID(req.body.email) === await lookUpID(req.session.user)){
          res.status(200).send({
            response: "You Cannot Add Yourself to Your Own Group"
          })
        } else if (user.group.includes(await lookUpID(req.body.email))) {
          res.status(200).send({
            response: "User Already Exists in Group"
          })
        } else {
          Users.update(
            {group: user.group + "," +await lookUpID(req.body.email)},
            {where: {email: req.session.user }}
          ).then(
            res.status(200).send({
              response: "Successfully Added User"
            })
          )
        }
      } catch (err) {
        res.status(200).send({
          response: 'Unable to find user'
        })
      }
    },
  }



