import axios from 'axios';
import history from '../history';

import { updateQuantity, showAlert } from './index';

// Initial State
const initialOrdersState = [];

// Action Types
const FETCH_ALL_ORDERS = 'FETCH_ALL_ORDERS';
const LOAD_ORDERS = 'LOAD_ORDERS';

// Action Creators
const fetch = orders => ({
  type: FETCH_ALL_ORDERS,
  orders
});

// Thunk Creators
export const fetchAllOrders = () => {
  return dispatch =>
    axios
      .get('/api/orders')
      .then(res => dispatch(fetch(res.data)))
      .catch(err => console.log(err));
};

export const refreshOrdersList = () => {
  return (dispatch, getState) =>
    axios
      .get(`/api/users/${getState().user.id}/orders`)
      .then(response => dispatch({ type: LOAD_ORDERS, payload: response.data }))
      .catch(err => console.log(err));
};

export const makeOrder = (data, items, history) => {
  console.log('Posting order...', JSON.stringify({ data, items }));
  return (dispatch, getState) => {
    const user = getState().user;
    axios
      .post(`/api/orders`, { data, items })
      .then(response => {
        getState().cart.forEach(cartItem => dispatch(updateQuantity(cartItem.productId, 0)));
        if (user.id) {dispatch(refreshOrdersList());}
        dispatch(showAlert(`Order #${response.data.id} submitted!`, 'Your order has been successfully placed.  Thanks for shopping with us!'))
        history.push('/products');
      })
      .catch(err => console.log(err));
  };
};

export default function reducer(orders = initialOrdersState, action) {
  switch (action.type) {
    case LOAD_ORDERS:
      return action.payload;
    case FETCH_ALL_ORDERS:
      return action.orders;
    default:
      return orders;
  }
}
