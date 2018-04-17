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
Category.hasMany(Product);
User.hasMany(CartItem);
CartItem.hasOne(User);
CartItem.hasOne(Product)
User.hasMany(Review);
Review.hasOne(User);

// User <> Orders
User.hasMany(Order);
Order.hasOne(User);

Order.hasOne(Address, { as: 'billingAddress' });
Order.hasOne(Address, { as: 'shippingAddress' });
Address.hasOne(User);

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
