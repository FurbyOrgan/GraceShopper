const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const CartItem = require('./cartItem');
const Review = require('./review');
const Address = require('./address');
const Order = require('./order');

// Categories
Product.belongsToMany(Category, { through: 'product_category' });
Category.belongsToMany(Product, { through: 'product_category' });

// Cart Items
User.hasMany(CartItem);
CartItem.belongsTo(User);
CartItem.belongsTo(Product);

// Reviews
Product.hasMany(Review);
User.hasMany(Review);
Review.belongsTo(Product);
Review.belongsTo(User);

// Orders
User.hasMany(Order);
Order.belongsTo(User);

// Addresses
Order.hasOne(Address, { as: 'billingAddress' });
Order.hasOne(Address, { as: 'shippingAddress' });
Address.belongsTo(User);

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Category,
  CartItem,
  Review,
  Address,
  Order
};
