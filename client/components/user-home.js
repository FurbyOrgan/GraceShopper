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
      <h3>Welcome, {user.firstName} at {email}</h3>
      {user.isAdmin? <h4>You are an admin!<Link to={`/`} userId={user.id}>Admin Home</Link></h4>: <h4>Welcome! Enjoy your shopping experience!</h4>}
      
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
