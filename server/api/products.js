const router = require('express').Router();
const { Product, Review, User, Category } = require('../db/models');

module.exports = router;

// Get all products list
router.get('/', (req, res, next) => {
  Product.scope('withCategories').findAll()
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
    
    const result = await Product.create({ title: req.body.title,
      price: req.body.price,
      inventory: req.body.inventory,
      description: req.body.description});

      await console.log(req.body, 'dat body', result)
      await req.body.categoriesId.forEach( category => result.addCategory(category))
  
    await res.json(result[1]);
  } catch (error) {
    next(error);
  }
});

// Update a particular product

router.put('/:id', async (req, res, next) => {
  try {
    const result = await Product.update({ title: req.body.title,
    price: req.body.price,
    inventory: req.body.inventory,
    description: req.body.description}, { where: { id: req.params.id }, returning: true });
  
    await req.body.categoriesId.forEach( category => result[1][0].addCategory(category))
    res.json(result[1]);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
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
