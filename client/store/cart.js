import axios from 'axios';
import history from '../history';
import store from '../store';

// Initial State
const initialCartState = [];

// Action Types
const LOAD_CART = 'LOAD_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

// Thunk Creators

export const refreshCart = () => {
  return dispatch =>
    axios
      .get('/api/cart')
      .then(response => dispatch({ type: LOAD_CART, payload: response }))
      .catch(err => console.log(err));
};

// If the user is logged in, updateQuantity will POST to the API with the change to their cart.
// If they are not logged in, updateQuantity will instead update window.localStorage.
// In both cases, the cart store in Redux will be updated.
export const updateQuantity = (productId, quantity) => {
  return (dispatch, getState) => {
    const updateQuantityAction = {
      type: UPDATE_QUANTITY,
      payload: { productId, quantity }
    };
    dispatch(updateQuantityAction);
    if (getState().user.id) {axios.post('/api/cart', updateQuantityAction.payload)}
    else {window.localStorage.setItem('guestCart', JSON.stringify(getState().cart))}
  }
};

export default function reducer(cart = initialCartState, action) {
  switch (action.type) {
    case LOAD_CART:
      return action.payload;
    case UPDATE_QUANTITY: {
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
