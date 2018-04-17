const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const CartItem = require('./cartItem');
const Review = require('./review');
const Address = require('./address');
const Order = require('./order');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Product.hasMany(Category);
Category.belongsToMany(Product);
CartItem.belongsTo(User);
User.hasMany(CartItem);
CartItem.belongsTo(Product)
User.hasMany(Review);
Review.belongsTo(User);

// User <> Orders
User.hasMany(Order);
Order.belongsTo(User);

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
