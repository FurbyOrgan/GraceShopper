import axios from 'axios';

// Initial State
const initialProductState = [];

/* -----------------    ACTION TYPES    ------------------ */
const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

/* ------------    ACTION CREATORS      ------------------ */
const update = product => ({ type: UPDATE_PRODUCT, product})


/* ------------         REDUCER         ------------------ */

export default function reducer(products = initialProductState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.payload;
    case UPDATE_PRODUCT:
      return products.map(product =>(
        action.id === product.id ? action.product :product
      ))
    default:
      return products;
  }
}
/* ------------       THUNK CREATORS     ------------------ */

export const refreshProductList = () => {
  return dispatch =>
    axios
      .get('/api/products')
      .then(response => dispatch({ type: LOAD_PRODUCTS, payload: response.data }))
      .catch(err => console.log(err));
}

export const updateProduct = (id, product) =>  dispatch => {
  axios.put(`/api/products/${id}`, product)
  .then(res => dispatch(update(res.data)))
  .catch(err => console.error(`Updating product: ${product} unsuccessful`, err))
}
