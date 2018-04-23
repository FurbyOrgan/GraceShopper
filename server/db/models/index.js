const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const LineItem = require('./lineItem');
const CartItem = require('./cartItem');
const Review = require('./review');
const Order = require('./order');

// Categories
Product.belongsToMany(Category, { through: 'product_category' });
Category.belongsToMany(Product, { through: 'product_category' });

// Cart Items
User.hasMany(CartItem);
CartItem.belongsTo(User, { foreignKey: { allowNull: false } });
CartItem.belongsTo(Product, { foreignKey: { allowNull: false } });

// Reviews
Product.hasMany(Review);
User.hasMany(Review);
Review.belongsTo(Product, { foreignKey: { allowNull: false } });
Review.belongsTo(User, { foreignKey: { allowNull: false } });

// Orders
User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(LineItem);
LineItem.belongsTo(Order);
LineItem.belongsTo(Product);

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  CartItem,
  Category,
  LineItem,
  Order,
  Product,
  Review,
  Address,
  User,

};
