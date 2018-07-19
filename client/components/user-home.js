import PropTypes   from 'prop-types'
import React       from 'react'
import { connect } from 'react-redux'
import { Link }    from 'react-router-dom'

export const UserHome = props => {
  const { email, user } = props

  return (
    <div>
      <h3>Welcome, {user.firstName} at {email}</h3>
      {user.isAdmin ? <h4>You are an admin!<Link to={`/`} userId={user.id}>Admin Home</Link></h4> : <h4>Welcome! Enjoy your shopping experience!</h4>}
    </div>
  )
}

const mapState = state => ({
  email: state.user.email,
  user: state.user
})

export default connect(mapState)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string
}
