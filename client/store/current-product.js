import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT';

/**
 * INITIAL STATE
 */
const initialCurrentProduct = {};

/**
 * ACTION CREATORS
 */
export function getProduct(product) {
    return {
        type: GET_PRODUCT,
        product
    }
}

/**
 * THUNK CREATORS
 */
export const getCurrentProduct = (id) => {
    return dispatch =>
        axios.get(`/api/products/${id}`)
            .then(response => dispatch(getProduct(response.data)))
            .catch(err => console.log(err))
}

export default function reducer(currentProduct = initialCurrentProduct, action) {
    switch (action.type) {
        case GET_PRODUCT:
            return action.product;
        default:
            return currentProduct;
    }
}