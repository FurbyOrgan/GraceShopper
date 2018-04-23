import axios from 'axios'
import history from '../history'

/* -----------------    ACTION TYPES    ------------------ */

export const FETCH_PRODUCT_REVIEWS = "FETCH_PRODUCT_REVIEWS"
export const GRAB_USER_REVIEWS = "GRAB_USER_REVIEWS"
export const CREATE_REVIEW = "CREATE_REVIEW";
export const UPDATE_REVIEW = "UPDATE_REVIEW"
export const REMOVE_REVIEW = "REMOVE_REVIEW"







/* ------------    ACTION CREATORS      ------------------ */

export const fetch = reviews => ({type: FETCH_PRODUCT_REVIEWS, reviews})
export const grab = reviews => ({type: GRAB_USER_REVIEWS, reviews})
export const create = review => ({type: CREATE_REVIEW, review})
export const update = review => ({type: UPDATE_REVIEW, review})
export const remove = review =>({type: REMOVE_REVIEW, id})







/* ------------         REDUCER         ------------------ */

export default function reducer (reviews = [], action) {
    switch (action.type) {
  
      case FETCH_PRODUCT_REVIEWS:
        return action.reviews;

      case GRAB_USER_REVIEWS:
      return action.reviews;
  
      case CREATE_REVIEW:
        return [action.review, ...reviews];
  
      case UPDATE_REVIEW:
      return reviews.map(reviews => (
        action.reviews.id === reviews.id ? action.review : review
      ));

      case REMOVE_REVIEW:
      return reviews.filter(review => review.id !== action.id);
  
      default:
        return reviews;
    }
  }


/* ------------       THUNK CREATORS     ------------------ */

export const grabUsersReviews = (id) => dispatch => {
    axios.get(`/api/users/${id}/reviews`)
         .then(res => dispatch(grab(res.data)))
         .catch(err => console.error('Fetching reviews unsuccessful', err));
  };



export const addReview = (id, review) => dispatch => {
    axios.post(`/api/users/${id}/reviews`, review)
         .then(res => dispatch(create(res.data)))
         .catch(err => console.error(`Creating review: ${review} unsuccessful`, err));
  };

export const fetchProductReviews = (id) => dispatch => {
    axios.get(`/api/products/${id}/reviews`)
         .then(res => dispatch(fetch(res.data)))
         .catch(err => console.error('Fetching reviews unsuccessful', err));
 }; 

 export const updateReview = (id, review) => dispatch => {
  axios.put(`/api/reviews/${id}`, review)
       .then(res => dispatch(update(res.data)))
       .catch(err => console.error(`Updating story: ${review} unsuccessful`, err));
};

 
 export const removeReview = id => dispatch => {
  axios.delete(`/api/reviews/${id}`)
       .then(() => dispatch(remove(id)))
       .catch(err => console.error(`Removing review: ${id} unsuccessful`, err));
};