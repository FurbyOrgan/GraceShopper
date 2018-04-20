const router = require('express').Router();
const loginStatus = require('./loginStatus')
module.exports = router;

router.use('/users', require('./users'));
router.use('/cart', loginStatus.isLoggedIn, require('./cart'));
router.use('/products', require('./products'));
router.use('/categories', require('./categories'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
