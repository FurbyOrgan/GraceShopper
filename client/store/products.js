import axios from 'axios';

// Initial State
const initialProductState = [];

// Action Types
const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT'

// Action Creators
// TODO

// Thunk Creators
export const refreshProductList = () => {
  return dispatch =>
    axios
      .get('/api/products')
      .then(response => dispatch({ type: LOAD_PRODUCTS, payload: response.data }))
      .catch(err => console.log(err));
}

export default function reducer(products = initialProductState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.payload;
    default:
      return products;
  }
}
