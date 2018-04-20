import axios from 'axios'
import history from '../history'

/* -----------------    ACTION TYPES    ------------------ */

const FETCH_PRODUCT_REVIEWS = "FETCH_PRODUCT_REVIEWS"
const GRAB_USER_REVIEWS = "GRAB_USER_REVIEWS"
const CREATE_REVIEW = "CREATE_REVIEW";
const UPDATE_REVIEW = "UPDATE_REVIEW"
const REMOVE_REVIEW = "REMOVE_REVIEW"







/* ------------    ACTION CREATORS      ------------------ */

const fetch = reviews => ({type: FETCH_PRODUCT_REVIEWS, reviews})
const grab = reviews => ({type: GRAB_USER_REVIEWS, reviews})
const create = review => ({type: CREATE_REVIEW, review})
const update = review => ({type: UPDATE_REVIEW, review})
const remove = review =>({type:REMOVE_REVIEW, id})







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