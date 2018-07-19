import axios from 'axios';

// Initial State
const initialProductState = [];

/* -----------------    ACTION TYPES    ------------------ */
const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const REMOVE_PRODUCT = "REMOVE_PRODUCT"

/* ------------    ACTION CREATORS      ------------------ */
const update = product => ({ type: UPDATE_PRODUCT, product})
const add = product => ({type:ADD_PRODUCT, product})
const remove = id =>({type: REMOVE_PRODUCT, id})



/* ------------         REDUCER         ------------------ */

export default function reducer(products = initialProductState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.payload;
    case ADD_PRODUCT:
      return [action.product, ...products]
    case UPDATE_PRODUCT:
      return products.map(product => (
        action.id === product.id ? action.product :product
      ));
    case REMOVE_PRODUCT:
      return products.filter(product => product.id !== action.id);
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

export const addProduct = (product) =>  dispatch => {
  axios.post('/api/products', product)
  .then(res => dispatch(add(res.data)))
  .catch(err => console.error(`Updating product: ${product} unsuccessful`, err))
}

export const removeProduct = id => dispatch => {
  axios.delete(`/api/products/${id}`)
       .then(() => dispatch(remove(id)))
       .catch(err => console.error(`Removing review: ${id} unsuccessful`, err));
};
