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
const db = require('../server/db');
const {
  Address,
  CartItem,
  Category,
  LineItem,
  Order,
  Product,
  Review,
  User
} = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@email.com',
      isAdmin: false,
      password: '123'
    }),
    User.create({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@email.com',
      isAdmin: true,
      password: '123'
    })
  ]);

  const categories = await Promise.all([
    Category.create({
      name: 'Copy Paper',
      description: "It's just paper."
    }),
    Category.create({
      name: 'Sticky Notes',
      imageUrl: '/img/stickyNote.png',
      description: 'Leave passive-aggressive notes around the office.'
    }),
    Category.create({ name: 'Lined Paper', description: 'Paper: now with lines.' }),
    Category.create({ name: 'Construction Paper', description: 'Make your own South Park episode!' })
  ]);

  const products = await Promise.all([
    Product.create({
      title: 'Yellow Sticky Note',
      description: "It's a single yellow sticky note.",
      price: 39.99,
      inventory: 500
    }),
    Product.create({
      title: 'Letter Copy Paper',
      description: 'One sheet of 8.5"x11" copy paper.',
      price: 199.99,
      inventory: 2000
    }),
    Product.create({
      title: 'Lined Paper',
      description: 'A single sheet of college-ruled lined paper.',
      price: 59.99,
      inventory: 3
    })
  ]);

  await products[0].addCategory(categories[1]);
  await products[1].addCategory(categories[0]);
  await products[2].addCategory(categories[2]);

  console.log('Building review');
  const review = Review.build({
    subject: 'Damaged Item',
    body: 'This paper arrived torn in half and scribbled with blue crayon.  Very dissatisfied.',
    rating: 2
  });
  console.log('Setting associations');
  review.setUser(users[0], { save: false });
  review.setProduct(products[1], { save: false });
  await review.save();

  console.log(`seeded successfully`);
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...');
