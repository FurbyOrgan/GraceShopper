const router = require('express').Router();
const { Order, Product, LineItem } = require('../db/models');

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
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next);
});

// POST body from an incoming order will include a data object, which has fields such as shipping
// address, billing address, and so forth, as well as an items array, which contains a list of item
// IDs and quantities.  This list should be transformed into a list of LineItems before being
// inserted into the database.
router.post('/', async (req, res, next) => {
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
    if (req.user) {newOrder.setUser(req.user, { save: false });}
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
    res.status(201).json(await newOrder.save());
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req, res, next) => {
  return res.json(req.requestedOrder);
});

router.put('/:id', (req, res, next) => {
  req.requestedOrder
    .update(req.body)
    .then(order => res.json(order))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  req.requestedOrder
    .destroy()
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});
