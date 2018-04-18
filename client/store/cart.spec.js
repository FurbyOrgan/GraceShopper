/* global describe beforeEach afterEach it */
import { createStore } from 'redux';
import { assert } from 'chai';
import { default as cartReducer, updateQuantity } from './cart';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Cart store', () => {
  describe('Reducer', () => {
    let store;

    beforeEach(() => {
      store = createStore(cartReducer);
    });

    it("adds items to the cart if they don't exist", () => {
      const fakeItem = { productId: 1, quantity: 2 };
      store.dispatch(updateQuantity(fakeItem.productId, fakeItem.quantity));
      assert.deepEqual(store.getState(), [fakeItem]);
    });

    it('deletes items from the cart if the quantity is set to zero', () => {
      const fakeItem = { productId: 1, quantity: 2 };
      store.dispatch(updateQuantity(fakeItem.productId, fakeItem.quantity));
      fakeItem.quantity = 0;
      store.dispatch(updateQuantity(fakeItem.productId, fakeItem.quantity));
      assert.deepEqual(store.getState(), []);
    });

    it('updates the quantity of existing items with the given new value', () => {
      const fakeItem = { productId: 1, quantity: 2 };
      store.dispatch(updateQuantity(fakeItem.productId, fakeItem.quantity));
      fakeItem.quantity = 4;
      store.dispatch(updateQuantity(fakeItem.productId, fakeItem.quantity));
      assert.deepEqual(store.getState(), [fakeItem]);
    });
  });
});
