import axios from 'axios';
import history from '../history';

import { updateQuantity } from './index';

// Initial State
const initialOrdersState = [];

// Action Types
const FETCH_ALL_ORDERS = 'FETCH_ALL_ORDERS'
const LOAD_ORDERS = 'LOAD_ORDERS';
const UPDATE_ORDER = 'UPDATE_ORDER';


// Action Creators
const fetch = orders => ({
  type: FETCH_ALL_ORDERS,
  orders
})

const update = order => ({
  type: UPDATE_ORDER,
  order,
})

// Thunk Creators
export const fetchAllOrders = () => {
  return dispatch =>
    axios
      .get('/api/orders')
      .then(res => dispatch(fetch(res.data)))
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

export const toggleOrderStatus = (order) => {
  return dispatch => {
    if (order.status === 'processing') {order.status = 'shipped';}
    else { order.status = 'processing' }
    axios.put(`/api/orders/${order.id}`, { id: order.id, status: order.status })
    .then(res => dispatch(update(res.data)))
    .catch(err => console.error(`Updating order: ${order} unsuccessful`, err))
  }
}

export const updateOrder = (id, order) => dispatch => {
  axios.put(`/api/orders/${id}`, order)
    .then(res => dispatch(update(res.data)))
    .catch(err => console.error(`Updating order: ${order} unsuccessful`, err))
}

export default function reducer(orders = initialOrdersState, action) {
  switch (action.type) {
    case LOAD_ORDERS:
      return action.payload;
    case FETCH_ALL_ORDERS:
      return action.orders
    case UPDATE_ORDER:
      return orders.map(order => (
        action.order.id === order.id ? action.order : order
      ))
    default:
      return orders;
  }
}
