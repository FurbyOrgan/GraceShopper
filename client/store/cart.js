import axios from 'axios';
import history from '../history';

// Initial State
const initialCartState = [];

// Action Types
const LOAD_CART = 'LOAD_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

// Action Creators

// Thunk Creators

export const refreshCart = () => {
  return dispatch =>
    axios
      .get('/api/cart')
      .then(response => dispatch({ type: LOAD_CART, payload: response }))
      .catch(err => console.log(err));
};

export const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { productId, quantity }
});

export default function reducer(cart = initialCartState, action) {
  switch (action.type) {
    case LOAD_CART:
      return action.payload;
    case UPDATE_QUANTITY:
      {
        const item = action.payload;
        // If quantity is zero, remove the item from the cart.
        if (item.quantity === 0) return cart.filter(element => element.productId !== item.productId);

        // Otherwise, update the cart quantity, provided that the product exists in the cart.
        let isNewItem = true;
        const updatedCart = cart.map(element => {
          if (element.productId === item.productId) {
            isNewItem = false;
            return item;
          }
          return element;
        });

        // If the product doesn't exist in the cart, add it.
        return isNewItem ? [...cart, item] : updatedCart;
      }
    default:
      return cart;
  }
}
