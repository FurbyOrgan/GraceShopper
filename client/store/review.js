import axios from 'axios'
import history from '../history'

/* -----------------    ACTION TYPES    ------------------ */

const FETCH_REVIEWS = "FETCH_REVIEWS"
const CREATE_REVIEW = "CREATE_REVIEW";







/* ------------    ACTION CREATORS      ------------------ */

const fetch = reviews => ({type: FETCH_REVIEWS, reviews})
const create = review => ({type: CREATE_REVIEW, review})







/* ------------         REDUCER         ------------------ */

export default function reducer (reviews = [], action) {
    switch (action.type) {
  
      case FETCH_REVIEWS:
        return action.reviews;
  
      case CREATE_REVIEW:
        return [action.review, ...reviews];
  
    
  
      default:
        return reviews;
    }
  }


/* ------------       THUNK CREATORS     ------------------ */

export const fetchReviews = (id) => dispatch => {
    axios.get(`/api/users/${id}/reviews`)
         .then(res => dispatch(init(res.data)))
         .catch(err => console.error('Fetching stories unsuccessful', err));
  };



export const addReview = (id, review) => dispatch => {
    axios.post(`/api/users/${id}/reviews`, review)
         .then(res => dispatch(create(res.data)))
         .catch(err => console.error(`Creating review: ${review} unsuccessful`, err));
  };