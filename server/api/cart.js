const router = require('express').Router();
const { Product, User, CartItem } = require('../db/models');
module.exports = router;

// Creates a dummy user session on the request object until
// auth/user login has been set up
router.all('/', (req, res, next) => {
  req.user = { id: 1 };
  next();
});

// Get the currently logged in user's shopping cart
router.get('/', async (req, res, next) => {
  try {
    res.send(await CartItem.findAll({ where: { userId: req.user.id } }));
  } catch (error) {
    next(error);
  }
});

// Add a new item to the user's shopping cart.
// If the item already exists, the quantity will be updated.
router.post('/', async (req, res, next) => {
  try {
    const cartItem = (await CartItem.findOrCreate({
      where: { userId: req.user.id, productId: req.body.productId }
    }))[0];
    cartItem.quantity = req.body.quantity;
    res.json(await cartItem.save());
  } catch (error) {
    next(error);
  }
});
