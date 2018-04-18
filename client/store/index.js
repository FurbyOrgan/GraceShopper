import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {combineForms} from 'react-redux-form'
import user from './user'


const review = {
  subject: "",
  body: "",
  rating: 0


}


const reducer = combineReducers({user})


const forms = combineForms({
  review: review,
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))



const store = createStore(reducer, middleware, forms);

export default store
export * from './user'
