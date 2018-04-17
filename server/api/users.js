const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router


router.param('id', (req, res, next) => {
  User.findById(id)
  .then(user => {
    if(!user) throw "Cannot find User"
    req.requestedUser = user;
    next()
  })
  .catch(next)
})



router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next)
})

router.post('/', (req, res, next) => {
  User.create(req.body)
  .then(user => res.status(201)).json(user)
  .catch(next);


})

router.get('/:id', (req, res, next) =>{
  req.requestedUser.reload()
  .then(requestedUser => res.json(requestedUser))
  .catch(next);

})


router.put('/:id', (req, res, next) =>{
  req.requestedUser.update(req.body)
  .then(user => res.json(user))
  .catch(next)
})

router.delete('/:id', (req, res, next) =>{
  req.requestedUser.destroy()
  .then( () => {
    res.sendStatus(204)
  })
  .catch(next)
})