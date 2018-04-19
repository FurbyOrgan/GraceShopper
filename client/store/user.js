import axios from 'axios';
import history from '../history';
import { restoreCart, updateQuantity } from './cart';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => {
      dispatch(getUser(res.data || defaultUser));
      dispatch(restoreCart());
    })
    .catch(err => console.log(err));

export const auth = (email, password, method) => (dispatch, getState) =>
  axios
    .post(`/auth/${method}`, { email, password })
    .then(
      res => {
        dispatch(getUser(res.data));
        // After logging in, POST any items in the guest user's cart to the API.  Once that
        // completes, retrieve the entire cart from the API.
        console.log('Logging in; posting local cart to API.')
        Promise.all(getState().cart.map(cartItem => axios.post('/api/cart', cartItem))).then(_ =>
          dispatch(restoreCart())
        );
        history.push('/home');
      },
      authError => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }));
      }
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));

export const logout = () => (dispatch, getState) =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser());
      // After logging out, clear the cart state and empty localStorage.
      getState().cart.forEach(cartItem => dispatch(updateQuantity(cartItem.productId, 0)));
      history.push('/login');
    })
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
