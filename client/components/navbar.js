import PropTypes   from 'prop-types'
import React       from 'react'
import { connect } from 'react-redux'
import { Link }    from 'react-router-dom'
import { Menu }    from 'semantic-ui-react';
import { logout }  from '../store'

import cartNavbarButton from './cart/cart-navbar-button';
import SearchBar from './common/search-bar';

const Navbar = ({ handleClick, isLoggedIn }) => {
  const loggedInConditionalRendering = () => {
    return (isLoggedIn)
    ? (<Menu.Item as={Link} to="/" onClick={handleClick} name="logout" />)
    : (<Menu.Item as={Link} to="/login" name="login" />)
  }

  return (
    <Menu secondary>
      <Menu.Item as={Link} to="/"           name="home" />
      <Menu.Item as={Link} to="/products"   name="products" />
      <Menu.Item as={Link} to="/categories" name="categories" />
      <Menu.Menu position="right">
        <Menu.Item as={cartNavbarButton} to="cart" />
        <Menu.Item>
          <SearchBar />
        </Menu.Item>
        {loggedInConditionalRendering()}
      </Menu.Menu>
    </Menu>
  )
}

const mapState = state => ({ isLoggedIn: !!state.user.id })

const mapDispatch = dispatch => ({
  handleClick() {
      dispatch(logout())
    }
})

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

