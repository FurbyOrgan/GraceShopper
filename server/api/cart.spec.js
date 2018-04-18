/* global describe beforeEach it */

const { assert } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const CartItem = db.model('cartItem')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({ force: true }).then(_ => {

    })
  })

  describe('/api/cart/', () => {
    beforeEach(() => {

      return CartItem.create({ userId: 1, productId: 1, quantity: 3 });
    })

    it("GET /api/cart returns an array containing the current user's shopping cart", () => {
      return request(app.get('/api/cart')
        .expect(200)
        .then(response => {
          assert.isArray(response);
          assert.deepEqual(response, [{ userId: 1, productId: 1, quantity: 3 }]);
        })
      )
    })
  })


})
