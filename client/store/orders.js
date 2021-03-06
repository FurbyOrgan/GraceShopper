import axios from 'axios';
import history from '../history';

import { updateQuantity, showAlert } from './index';

// Initial State
const initialOrdersState = [];

// Action Types
const FETCH_ALL_ORDERS = 'FETCH_ALL_ORDERS';
const FETCH_SINGLE_ORDER = 'FETCH_SINGLE_ORDER';
const LOAD_ORDERS = 'LOAD_ORDERS';
const UPDATE_ORDER = 'UPDATE_ORDER';
const GET_LINE_ITEMS = 'GET_LINE_ITEMS'


// Action Creators
const fetch = orders => ({
  type: FETCH_ALL_ORDERS,
  orders
});

const update = order => ({
  type: UPDATE_ORDER,
  order,
})

const getItems = lineItems => ({
  type: GET_LINE_ITEMS,
  lineItems
})

// Thunk Creators
export const fetchOrderItems = (order) => {
  return (dispatch => {
    return (
      axios
        .get(`/api/orders/${order.id}/items`)
        .then(res => {
          const lineItems = res.data
          const newOrder = {...order, lineItems}
          dispatch(update(newOrder))
        })
        .catch(err => console.log(err))
    )
  })
}

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

// export const getLineItems ()

export default function reducer(orders = initialOrdersState, action) {
  switch (action.type) {
    case LOAD_ORDERS:
      return action.payload;
    case FETCH_ALL_ORDERS:
      return action.orders;
    case UPDATE_ORDER:
      return orders.map(order => (
        action.order.id === order.id ? action.order : order
      ))
    default:
      return orders;
  }
}
