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

router.delete('/:id', (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      user.update({
        $pull:
          { ideas: { _id: req.params.id } }
      })
        .then((data) => {
          res.sendStatus(200)
        })
        .catch(console.error)
    })
    .catch(console.error)
})

router.patch('/:id', (req, res) => {
  console.log("HITTING IDEA PATCH ROUTE")
  console.log("User Id", req.params.userId)
  User.findById(req.params.userId)
    .then((user) => {
      const idea = user.ideas.id(req.params.id)
      const updatedIdea = req.body.idea
      if (updatedIdea.title) {
        idea.title = updatedIdea.title
      }
      if (updatedIdea.description) {
        idea.description = updatedIdea.description
      }
      user.save()
        .then((user) => {
          user.ideas = user.ideas.reverse()
          res.json(user)
        })
        .catch(console.err)
    })
    .catch(console.err)
})

module.exports = router