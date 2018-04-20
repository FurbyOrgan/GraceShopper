import axios from 'axios';

// Initial State
const initialCartState = [];

// Action Types
const LOAD_CART = 'LOAD_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

// Action Creators
export const loadCart = cartData => ({ type: LOAD_CART, payload: cartData || [] });

// Thunk Creators
// If the user is logged in, make a GET request to the API to retrieve their cart from Postgres.
// Otherwise, retrieve the cart from window.localStorage.
export const restoreCart = () => {
  return (dispatch, getState) => {
    if (getState().user.id) {
      console.log('Retrieving cart from API.');
      axios
        .get('/api/cart')
        .then(response => dispatch(loadCart(response.data)))
        .catch(err => console.log(err));
    } else {
      console.log('Retrieving cart from localStorage.');
      dispatch(loadCart(JSON.parse(window.localStorage.getItem('guestCart'))));
    }
  };
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
    if (getState().user.id) {
      console.log('Posting cart update to API.');
      axios.post('/api/cart', updateQuantityAction.payload);
    } else {
      console.log('Writing cart update to localStorage.');
      window.localStorage.setItem('guestCart', JSON.stringify(getState().cart));
    }
  };
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
