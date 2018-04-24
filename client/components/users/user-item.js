import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Button, Checkbox } from 'semantic-ui-react';
import { toggleUserAdmin, deleteUser, forcePasswordReset } from '../../store';

const UserItem = ({ doToggleAdmin, doDeleteUser, doForcePasswordReset, user }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{`${user.firstName} ${user.lastName}`}</Card.Header>
        <Card.Meta>{user.email}</Card.Meta>
        <Card.Description>
          <Checkbox
            toggle
            label="Administrator"
            onClick={() => doToggleAdmin(user.id)}
            checked={user.isAdmin}
          />
        </Card.Description>
      </Card.Content>
      <Button.Group attached="bottom">
        <Button disabled={user.needsPasswordReset} onClick={() => doForcePasswordReset(user.id)}>Password Reset</Button>
        <Button color="red" onClick={() => doDeleteUser(user.id)}>Delete</Button>
      </Button.Group>
    </Card>
  );
};
const mapStore = ({users}) => ({users})
const mapDispatch = dispatch => ({
  doToggleAdmin: userId => dispatch(toggleUserAdmin(userId)),
  doDeleteUser: userId => dispatch(deleteUser(userId)),
  doForcePasswordReset: userId => dispatch(forcePasswordReset(userId))
});

export default connect(mapStore, mapDispatch)(UserItem);
