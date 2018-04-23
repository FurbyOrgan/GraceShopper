import axios from 'axios';
import { updateQuantity } from './index';

// Initial State
const initialOrdersState = [];

// Action Types
const LOAD_ALL_ORDERS = 'LOAD_ALL_ORDERS'
const LOAD_ORDERS = 'LOAD_ORDERS';

// Action Creators
// TODO

// Thunk Creators
export const refreshAllOrdersList = () => {
  return dispatch =>
    axios
      .get('/api/orders')
      .then(response => dispatch({type: LOAD_ALL_ORDERS, payload: response.data}))
      .catch(err => console.log(err))
}

export const refreshOrdersList = () => {
  return (dispatch, getState) =>
    axios
      .get(`/api/users/${getState().user.id}/orders`)
      .then(response => dispatch({ type: LOAD_ORDERS, payload: response.data }))
      .catch(err => console.log(err));
};

export const makeOrder = (data, items, history) => {
  console.log('Posting...', JSON.stringify({ data, items }));
  return (dispatch, getState) => {
    axios
      .post(`/api/users/${getState().user.id}/orders`, { data, items })
      .then(response => {
        console.log('Order placed');
        getState().cart.forEach(cartItem => dispatch(updateQuantity(cartItem.productId, 0)));
        history.push('/');
      })
      .catch(err => console.log(err));
  };
};

export default function reducer(products = initialOrdersState, action) {
  switch (action.type) {
    case LOAD_ORDERS:
      return action.payload;
    default:
      return products;
  }
}
