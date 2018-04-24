const express = require('express')
const { User } = require('../db/schema')
const router = express.Router()

router.get('/', (req, res) => {
  User.find()
    .then(users => {
      console.log("SENDING USERS", users)
      res.json(users)
    })
    .catch((err) => console.log(err))
})

router.post('/', (req, res) => {
  const user = req.body.user
  console.log("CREATING USER", user)
  User.create(user)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => console.log(err))
})

module.exports = router