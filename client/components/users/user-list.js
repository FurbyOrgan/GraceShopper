import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Header, Item } from 'semantic-ui-react';
import { refreshUsersList } from '../../store';

class UsersList extends Component {

  componentDidMount() {
    this.props.doRefreshUsers();
  }

  render() {
    const users = this.props.users;
    return (
      <Container text>
        <Header as="h2">All Users</Header>
        <Item.Group divided>
          {users.map(user => <h3>{`${user.id} ${user.firstName}`}</h3>)}
        </Item.Group>
      </Container>
    );
  }
}

const mapState = (state) => ({ users: state.users });
const mapDispatch = dispatch => ({
  doRefreshUsers: refreshUsersList
})

export default connect(mapState, mapDispatch)(UsersList);
