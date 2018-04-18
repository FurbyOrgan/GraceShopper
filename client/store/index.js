import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


//Apply combineForm reducer

import {combineForms} from 'react-redux-form'

const review = {
  subject: "",
  body: ""
}
const forms =  combineForms({
  review: review
})

// Import and combine subreducers
import user from './user';
import cart from './cart';
import products from './products';
const reducer = combineReducers({ user, cart, products, forms});

// Apply middleware, export combined reducer and action creators from subreducer modules
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })));
export default createStore(reducer, middleware);
export * from './user';
export * from './cart';
export * from './products';

