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

// POST body from an incoming order will include a data object, which has fields such as shipping
// address, billing address, and so forth, as well as an items array, which contains a list of item
// IDs and quantities.  This list should be transformed into a list of LineItems before being
// inserted into the database.
router.post('/:id/orders', async (req, res, next) => {
  try {
    const { orderFirstName, orderLastName, orderEmail } = req.body.data;
    const { shippingStreet, shippingCity, shippingState, shippingZipCode } = req.body.data;
    const { billingStreet, billingCity, billingState, billingZipCode } = req.body.data;

    let newOrder = Order.build({
      date: new Date(),
      status: 'processing',
      orderFirstName,
      orderLastName,
      orderEmail,
      shippingStreet,
      shippingCity,
      shippingState,
      shippingZipCode,
      billingStreet,
      billingCity,
      billingState,
      billingZipCode
    });
    newOrder.setUser(req.requestedUser, { save: false });
    newOrder = await newOrder.save();

    // Lookup products and their current prices based on the list of productIds sent by the client
    const lineItems = req.body.items.map(async item => {
      const product = await Product.findById(item.productId);
      const newLineItem = LineItem.build({
        quantity: item.quantity,
        price: product.price
      });
      newLineItem.setProduct(product, { save: false });
      newLineItem.setOrder(newOrder, { save: false });
      return newLineItem.save();
    });
    await Promise.all(lineItems);
    res.json(await newOrder.save());
  } catch (error) {
    next(error);
  }
});
