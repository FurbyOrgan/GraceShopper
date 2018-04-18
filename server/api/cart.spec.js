/* global describe beforeEach it */

const { assert } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const CartItem = db.model('cartItem');

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({ force: false }).then(_ => {});
  });

  describe('/api/cart/', () => {
    let cartItem;
    beforeEach(() => {
      return CartItem.create({ userId: 1, productId: 1, quantity: 3 }).then(item => {
         return cartItem = item.dataValues;
      });
    });

    it("GET /api/cart returns an array containing the current user's shopping cart", () => {
      return request(app)
        .get('/api/cart')
        .expect(200)
        .then(({ body }) => {
          assert.isArray(body);
          assert.deepEqual(body, [cartItem]);
        });
    });
  });
});
