import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


//Apply combineForm reducer

import {combineForms} from 'react-redux-form'

const review = {
  subject: '',
  body: ''
}

const initialCheckoutState = {
  orderFirstName: '',
  orderLastName: '',
  orderEmail: '',
  shippingAddress: '',
  shippingCity: '',
  shippingState: '',
  shippingZip: '',
  billingAddress: '',
  billingCity: '',
  billingState: '',
  billingZip: '',
}
const forms =  combineForms({
  review: review,
  checkout: initialCheckoutState
})

// Import and combine subreducers
import user from './user';
import cart from './cart';
import products from './products';
import categories from './categories';
import currentProduct from './current-product';
import reviews from './review'
const reducer = combineReducers({ user, cart, products, currentProduct, categories, reviews, forms });

// Apply middleware, export combined reducer and action creators from subreducer modules
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })));
export default createStore(reducer, middleware);
export * from './user';
export * from './cart';
export * from './products';
export * from './categories';
export * from './current-product';
