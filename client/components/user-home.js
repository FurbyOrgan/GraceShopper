import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props
  const {user} = props
  console.log(props,"propssss")

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <Link to={`/user/${user.id}/reviews`} userId={user.id}> Reviews </Link>
      <Link to={`/user/${user.id}/assignCategories`} > Assign Categories </Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
