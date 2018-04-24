const router = require('express').Router();
const { Order, LineItem } = require('../db/models');

module.exports = router;

router.param('id', (req, res, next, id) => {
  Order.findById(id)
    .then(order => {
      if (!order) throw 'Cannot find Order';
      req.requestedOrder = order;
      next();
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  Order.findAll({
  })
    .then(orders => res.json(orders))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.status(201))
    .json(order)
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json(req.requestedOrder);
});

router.put('/:id', (req, res, next) => {
  req.requestedOrder
    .update(req.body, {returning: true})
    .then(result => {
      res.json(result)
    })
    .catch(next);
});

/**
 * Get line items associated with this order
 */
router.get('/:id/items', (req, res, next) => {
  LineItem.findAll({
    where: {
      orderId : req.params.id
    }
  })
  .then(itemInOrder => res.json(itemInOrder))
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  req.requestedOrder
    .destroy()
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});
