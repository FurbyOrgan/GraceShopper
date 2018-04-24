import axios from 'axios';

// Initial State
const initialCategoriesState = [];

// Action Types
const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
const ASSIGN_CATEGORIES = 'ASSIGN_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'

// Action Creators
const assign = categories => ({type: ASSIGN_CATEGORIES, categories})
const add = category => ({type: ADD_CATEGORY, category})


//Reducer
export default function reducer(categories = initialCategoriesState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return action.payload;
    case ADD_CATEGORY:
      return [action.category, ...categories]
    default:
      return categories;
  }
}

// Thunk Creators
export const refreshCategoryList = () => {
  return dispatch =>
    axios
      .get('/api/categories')
      .then(response => dispatch({ type: LOAD_CATEGORIES, payload: response.data }))
      .catch(err => console.log(err));
}


export const addCategory = (category) =>  dispatch => {
  axios.post('/api/categories', category)
  .then(res => dispatch(add(res.data)))
  .catch(err => console.error(`Updating product: ${category} unsuccessful`, err))
}
