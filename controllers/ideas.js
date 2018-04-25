const express = require('express')
const { User, Idea } = require('../db/schema')
const router = express.Router({ mergeParams: true })

router.post('/', (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      const newIdea = new Idea()
      user.ideas.push(newIdea)
      user.save()
        .then((data) => {
          console.log("DATA TO BE SENT", data)
          res.json(data)
        })
    })
    .catch((err) => {
      console.error(err)
    })
})

module.exports = router