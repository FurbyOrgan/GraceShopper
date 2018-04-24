const router = require('express').Router();
const { User, Review, Order, LineItem, Product } = require('../db/models');
module.exports = router;

router.param('id', (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      if (!user) throw 'Cannot find User';
      req.requestedUser = user;
      next();
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next);
});

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201))
    .json(user)
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json(req.requestedUser);
});

router.put('/:id', (req, res, next) => {
  req.requestedUser
    .update(req.body)
    .then(user => res.json(user))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  req.requestedUser
    .destroy()
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});
/* -----routes reviews by users-----*/
router.get('/:id/reviews', (req, res, next) => {
  Review.findAll({
    where: {
      userId: req.params.id
    }
  })
    .then(reviewByUser => res.json(reviewByUser))
    .catch(next);
});

router.post('/:id/reviews', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.sendStatus(204))
    .catch(next);
});

/* -----routes orders by users-----*/
router.get('/:id/orders', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.id
    },
    include: [LineItem]
  })
    .then(ordersByUser => res.json(ordersByUser))
    .catch(next);
});
