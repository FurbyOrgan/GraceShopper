import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Item} from 'semantic-ui-react';


const UserItem = ({ user }) => {
  return (
    <Item>
      <Item.Content>
      <Item.Header as={Link}to={`/categories/${user.id}`}>
      	<h3>{user.firstName} {user.lastName}</h3>
      </Item.Header>
      <Item.Description>{user.email}</Item.Description>
      <Item.Description>{user.isAdmin? <div>User is admin.</div>: <div> User is not an admin</div>}</Item.Description>
      </Item.Content>
    </Item>
  );
};

export default UserItem;