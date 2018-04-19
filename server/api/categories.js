const router = require('express').Router();
const { Product, Category } = require('../db/models');

module.exports = router;

// Get all categories
router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(next);
});

// Create a new category
router.post('/', async (req, res, next) => {
  try {
    const result = await Category.create(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Update a particular category
router.put('/:id', async (req, res, next) => {
  try {
    const result = await Category.update(req.body, { where: { id: req.params.id }, returning: true });
    res.json(result[1]);
  } catch (error) {
    next(error);
  }
});

// Delete a particular category
router.delete('/:id', async (req, res, next) => {
  try {
    await Category.destroy(req.body, { where: { id: req.params.id }, returning: true });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
