import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Import and combine subreducers
import user from './user';
import products from './products';
const reducer = combineReducers({ user, products });





// Apply middleware, export combined reducer and action creators from subreducer modules

export * from './user';
export * from './products';

const forms = combineForms({
  review: {
    subject: "",
    body: "",
    rating: 0
    
  }
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))



const store = createStore(reducer, middleware, forms);

