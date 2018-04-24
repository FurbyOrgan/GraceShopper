const router = require('express').Router()
const { LineItem } = require('../db/models');

module.exports = router

router.param('id', (req, res, next, id) => {
    LineItem.findById(id)
        .then(lineItem => {
            if(!lineItem) throw 'Cannot find LineItem';
            req.requestedLineItem = lineItem
            next()
        })
})

router.get('/', (req, res, next) => {
    LineItem.findAll()
        .then(lineItems => res.json(lineItems))
        .catch(next)
})

router.post('/', (req, res, next) => {
    LineItem.create(req.body)
        .then(lineItem => res.json(lineItem))
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    return res.json(req.requestedLineItem)
})

router.put('/:id', (req, res, next) => {
    req.requestedLineItem
        .update(req.body)
        .then(lineItem => res.json(lineItem))
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    req.requestedLineItem
        .destroy()
        .then(() => {
            res.sendStatus(204)
        })
        .catch(next)
})