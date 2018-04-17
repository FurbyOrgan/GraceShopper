const router = require('express').Router()
const { Product, Review } = require('../db/models')

module.exports = router

router.get('/products', (req, res, next) => {
    Product.findAll()
    .then(product => res.json(product))
    .catch(next)
})

router.get('/products/:id/reviews', (req, res, next) => {
    Review.findAll({
        where: {
            productId: req.params.id
        }
    })
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.post('/products/:id/reviews', (req, res, next) => {
    Review.create(req.body)
    .then(review => resstatus(201).json(review))
    .catch(next)
})



//add to index.js >>>>>   router.use('/products', require('./products'))