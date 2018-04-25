import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Header, Item, Card } from 'semantic-ui-react';
import { refreshUsersList } from '../../store';
import UserItem from './user-item';

class UsersList extends Component {
  componentDidMount() {
    this.props.doRefreshUsers();
  }

  render() {
    const users = this.props.users;
    return (
      <Container >
        <Header as="h2">All Users</Header>
        <Card.Group>{users.map(user => <UserItem key={user.id} user={user} />)}</Card.Group>
      </Container>
    );
  }
}

const mapState = state => {
  return {
    users: state.users.sort((a, b) => {
      if (a.lastName > b.lastName) return 1
      else return -1;
  }) };
};
const mapDispatch = dispatch => ({
  doRefreshUsers: () => dispatch(refreshUsersList())
});

export default connect(mapState, mapDispatch)(UsersList);
