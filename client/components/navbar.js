import React, { Component } from 'react'
import { Input, Menu, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { logout } from '../store'
import SearchBar from './common/search-bar';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <Menu secondary>
        <Menu.Item as={Link} to="/" name="home" />
        <Menu.Item as={Link} to="/products" name="products" />
        <Menu.Menu position="right">
          <Menu.Item>
            <SearchBar />
          </Menu.Item>
          <Menu.Item name="logout" />
        </Menu.Menu>
      </Menu>
  </div>
)

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

