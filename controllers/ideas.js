const express = require('express')
const { User, Idea } = require('../db/schema')
const router = express.Router({ mergeParams: true })

router.post('/', (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      user.ideas.push(new Idea())
      user.save()
        .then((data) => {
          res.json(data)
        })
    })
    .catch((err) => {
      console.error(err)
    })
})

module.exports = router