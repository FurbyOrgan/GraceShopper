import React, { Component } from 'react'
import { Input, Menu, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { Icon } from 'semantic-ui-react'

import cartNavbarButton from './cart/cart-navbar-button';
import SearchBar from './common/search-bar';
import { Login } from './index'

const Navbar = ({ handleClick, isLoggedIn }) => {
  const loggedInConditionalRendering = () => {
    if (isLoggedIn) return (<Menu.Item as={Link} to="/login" name="logout" />)
    else return (<Menu.Item as={Link} to="/login" name="login" />)
  }

  return (
    <Menu secondary>
      <Menu.Item as={Link} to="/" name="home" />
      <Menu.Item as={Link} to="/products" name="products" />
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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

