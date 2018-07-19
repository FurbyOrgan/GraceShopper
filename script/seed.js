/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const Promise = require('bluebird')
const chance  = require('chance')(123)
const faker   = require('faker')

function doTimes (n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

const db = require('../server/db');
const {
  CartItem,
  Category,
  LineItem,
  Order,
  Product,
  Review,
  User
} = require('../server/db/models');

/**
 * MAKE AS MANY CART ITEMS AS WE WANT!
 */
function randomCartItem(products, users) {
  const product = chance.pick(products)
  const user    = chance.pick(users)

  const maxQuantity = 5

  return CartItem.build({
    quantity:  Math.floor(Math.random() * Math.floor(maxQuantity)),
    userId:    user.id,
    productId: product.id,
  })
}

function generateCartItems(products, users) {
  const numCartItems = 50
  return doTimes(numCartItems, () => randomCartItem(products, users))
}

function createCartItems(products, users) {
  return Promise.map(generateCartItems(products, users), cartItem => cartItem.save())
}

/**
 * STUFF TO MAKE AS MANY CATEGORIES AS WE WANT!
 */
function randomCategory() {
  return Category.build({
    name:        faker.commerce.department(),
    description: faker.lorem.sentence(),
  })
}

function generateCategories() {
  const numCategories = 5
  return doTimes(numCategories, randomCategory)
}

function createCategories() {
  return Promise.map(generateCategories(), category => category.save())
}

/**
 * MAKE AS MANY LINEITEMS AS WE WANT!
 */
function randomLineItem(orders, products) {
  const maxQuantity = 5

  const order   = chance.pick(orders)
  const product = chance.pick(products)

  return LineItem.build({
    quantity  : Math.floor(Math.random() * Math.floor(maxQuantity)),
    price     : (faker.finance.amount(0.01)),
    orderId   : order.id,
    productId : product.id,
  })
}

function generateLineItems(orders, products) {
  const numLineItems = 300
  return doTimes(numLineItems, () => randomLineItem(orders, products))
}

function createLineItems(orders, products) {
  return Promise.map(generateLineItems(orders, products), lineItem => lineItem.save())
}

/**
 * STUFF TO MAKE AS MANY ORDERS AS WE WANT!
 */
function randomOrder(users) {
  const status = chance.pick(['processing', 'shipped'])
  const user   = chance.pick(users)

  return Order.build({
    date: faker.date.recent(),
    status:          status,
    orderFirstName:  user.firstName,
    orderLastName:   user.lastName,
    orderEmail:      user.email,
    userId:          user.id,
    shippingStreet:  faker.address.streetAddress(),
    shippingCity:    faker.address.city(),
    shippingState:   faker.address.stateAbbr(),
    shippingZipCode: faker.address.zipCode(),
    billingStreet:   faker.address.streetAddress(),
    billingCity:     faker.address.city(),
    billingState:    faker.address.stateAbbr(),
    billingZipCode:  faker.address.zipCode(),
  })
}

function generateOrders(users) {
  const numOrders = 100
  return doTimes(numOrders, () => randomOrder(users))
}

function createOrders(users) {
  return Promise.map(generateOrders(users), order => order.save())
}

/**
 * STUFF TO MAKE AS MANY PRODUCTS AS WE WANT!
 */
function randomProduct() {
  const maxInventory = 99

  return Product.build({
    title:       faker.commerce.productName(),
    description: faker.lorem.sentence(),
    price:       faker.commerce.price(),
    inventory:   Math.floor(Math.random() * Math.floor(maxInventory)),
    imageUrl:    faker.image.abstract(),
  })
}

function generateProducts(categories) {
  const numProducts = 10
  return doTimes(numProducts, () => randomProduct(categories))
}

function createProducts(categories) {
  return Promise.map(generateProducts(categories), product => product.save())
}


/**
 * MAKE AS MANY REVIEWS AS WE WANT!
 */
function randomReview(products, users) {
  const product = chance.pick(products)
  const user    = chance.pick(users)

  return Review.build({
    subject:   faker.lorem.sentence(),
    body:      faker.lorem.paragraph(),
    rating:    Math.floor(Math.random() * Math.floor(4) + 1),
    productId: product.id,
    userId:    user.id,
  })
}

function generateReviews(products, users) {
  const numReviews = 500
  return doTimes(numReviews, () => randomReview(products, users))
}

function createReviews(products, users) {
  return Promise.map(generateReviews(products, users), review => review.save())
}

/**
 * STUFF TO MAKE AS MANY USERS AS WE WANT!
 */
function randomUser() {
  return User.build({
    firstName: faker.name.firstName(),
    lastName:  faker.name.lastName(),
    email:     faker.internet.email(),
    isAdmin:   false,
    password:  'password',
  })
}

function generateUsers() {
  const numUsers = 100
  const users = doTimes(numUsers, randomUser)
  users.push(User.build({
    firstName: 'Adam',
    lastName:  'Admin',
    email:     'adam@admin.com',
    isAdmin:   true,
    password:  'password',
  }))
  return users
}

function createUsers() {
  return Promise.map(generateUsers(), user => user.save())
}

/**
 * Actual seeding bit
 */
async function seed() {
  await db.sync({force: true})
    const categories = await createCategories()
    const users      = await createUsers()
    const orders     = await createOrders(users)
    const products   = await createProducts(categories)
    await createCartItems(products, users)
    await createLineItems(orders, products)
    await createReviews(products, users)
    await Promise.all(products.map(product => {
      return product.addCategory(chance.pick(categories))
    }))
    
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })
