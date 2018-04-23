import axios from 'axios';

// Initial State
const initialUsersState = [];

/* -----------------    ACTION TYPES    ------------------ */
const LOAD_USERS = 'LOAD_USERS';
const UPDATE_USER = 'UPDATE_USER'

/* ------------    ACTION CREATORS      ------------------ */
const update = user => ({ type: UPDATE_USER, user})

/* ------------         REDUCER         ------------------ */
export default function reducer(users = initialUsersState, action) {
  switch (action.type) {
    case LOAD_USERS:
      return action.payload;
    case UPDATE_USER:
      return users.map(user => (
        action.id === user.id ? action.user : user
      ));
    default:
      return users;
  }
}
/* ------------       THUNK CREATORS     ------------------ */

export const refreshUsersList = () => {
  return dispatch =>
    axios
      .get('/api/users')
      .then(response => dispatch({ type: LOAD_USERS, payload: response.data }))
      .catch(err => console.log(err));
}

export const updateUsers = (id, user) =>  dispatch => {
  axios.put(`/api/users/${id}`, user)
  .then(res => dispatch(update(res.data)))
  .catch(err => console.error(`Updating user: ${user} unsuccessful`, err))
}
