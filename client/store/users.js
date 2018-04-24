import axios from 'axios';

// Initial State
const initialUsersState = [];

/* -----------------    ACTION TYPES    ------------------ */
const LOAD_USERS = 'LOAD_USERS';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';

/* ------------    ACTION CREATORS      ------------------ */
const update = user => ({ type: UPDATE_USER, user });
const destroy = userId => ({ type: DELETE_USER, userId });

/* ------------         REDUCER         ------------------ */
export default function reducer(users = initialUsersState, action) {
  switch (action.type) {
    case LOAD_USERS:
      return action.payload;
    case UPDATE_USER:
      return users.map(user => (user.id == action.user.id ? action.user : user));
    case DELETE_USER:
      return users.filter(user => user.id !== action.userId)
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
};

export const toggleUserAdmin = userId => {
  return (dispatch, getState) => {
    const currentUser = getState().users.filter(user => user.id == userId)[0];
    currentUser.isAdmin = !currentUser.isAdmin;
    axios
      .put(`/api/users/${userId}`, currentUser)
      .then(res => dispatch(update(res.data)))
      .catch(err => console.error(`Updating user: ${currentUser} unsuccessful`, err));
  };
};

export const forcePasswordReset = userId => {
  return (dispatch, getState) => {
    const currentUser = getState().users.filter(user => user.id == userId)[0];
    currentUser.needsPasswordReset = true;
    axios
      .put(`/api/users/${userId}`, currentUser)
      .then(res => dispatch(update(res.data)))
      .catch(err => console.error(`Updating user: ${currentUser} unsuccessful`, err));
  };
};

export const deleteUser = userId => {
  return (dispatch, getState) => {
    const currentUser = getState().users.filter(user => user.id == userId)[0];
    axios
      .delete(`/api/users/${userId}`, currentUser)
      .then(res => dispatch(destroy(userId)))
      .catch(err => console.error(`Updating user: ${currentUser} unsuccessful`, err));
  };
};

export const updateUsers = (id, user) => dispatch => {
  axios
    .put(`/api/users/${id}`, user)
    .then(res => dispatch(update(res.data)))
    .catch(err => console.error(`Updating user: ${user} unsuccessful`, err));
};
