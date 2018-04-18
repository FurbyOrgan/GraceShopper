const router = require('express').Router();
const { Product, Review, User } = require('../db/models');

module.exports = router;

// Get all products list
router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next);
});

// Get a particular product
router.get('/:id', async (req, res, next) => {
  try {
    const resultProduct = await Product.findById(req.params.id);
    res.json(resultProduct);
  } catch (error) {
    next(error);
  }
});

// Create a new product
router.post('/', async (req, res, next) => {
  try {
    const result = await Product.create(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Update a particular product
router.put('/:id', async (req, res, next) => {
  try {
    const result = await Product.update(req.body, { where: { id: req.params.id }, returning: true });
    res.json(result[1]);
  } catch (error) {
    next(error);
  }
});

// Get all reviews for a particular product
router.get('/:id/reviews', (req, res, next) => {
  Review.findAll({
    where: {
      productId: req.params.id
    },
    include: [{ model: User }]
  })
    .then(reviews => res.json(reviews))
    .catch(next);
});

// Create a new review for a particular product
router.post('/:id/reviews', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.status(201).json(review))
    .catch(next);
});

//add to index.js >>>>>   router.use('/products', require('./products'))
