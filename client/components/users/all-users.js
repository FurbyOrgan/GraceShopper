import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Item } from 'semantic-ui-react'
import UserItem from './user-item'



const UserList = ({ users }) => {
    return (
      <Container text>
        <h2>Categories</h2>
        <Item.Group divided>
          {users.map(user => <UserItem key={user.id} user={user.id} />)}
        </Item.Group>
      </Container>
    );
  };


const mapStateToProps = ({ users }) => ({ users })
export default connect(mapStateToProps, null)(UserList);