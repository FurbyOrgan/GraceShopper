import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Import and combine subreducers
import user from './user';
import cart from './cart';
import products from './products';
import currentProduct from './current-product';
const reducer = combineReducers({ user, cart, products, currentProduct });

// Apply middleware, export combined reducer and action creators from subreducer modules
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })));
export default createStore(reducer, middleware);
export * from './user';
export * from './cart';
export * from './products';
export * from './current-product';