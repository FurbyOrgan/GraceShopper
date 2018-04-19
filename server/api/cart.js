const router = require('express').Router();
const { Product, User, CartItem } = require('../db/models');
module.exports = router;

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
// If the quantity is zero, the item will be removed from the cart.
router.post('/', async (req, res, next) => {
  try {
    if (req.body.quantity === 0) {
      await CartItem.destroy({
        where: { userId: req.user.id, productId: req.body.productId }
      });
      res.sendStatus(204);
    } else {
      const cartItem = (await CartItem.findOrCreate({
        where: { userId: req.user.id, productId: req.body.productId }
      }))[0];
      cartItem.quantity = req.body.quantity;
      res.json(await cartItem.save());
    }
  } catch (error) {
    next(error);
  }
});
