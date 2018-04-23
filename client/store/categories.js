import axios from 'axios';

// Initial State
const initialCategoriesState = [];

// Action Types
const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
const ASSIGN_CATEGORIES = 'ASSIGN_CATEGORIES'

// Action Creators
const assign = categories => ({type: ASSIGN_CATEGORIES, categories})


//Reducer
export default function reducer(categories = initialCategoriesState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return action.payload;
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
