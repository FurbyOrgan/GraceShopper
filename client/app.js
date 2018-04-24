import React from 'react';
import { connect } from 'react-redux';
import {
  refreshProductList,
  refreshCategoryList,
  restoreCart,
  fetchAllOrders,
  fetchAllLineItems,
  changePassword
} from './store';
import { Navbar } from './components';
import { withRouter } from 'react-router-dom';
import { Modal, Header, Button, Icon, Form, Grid } from 'semantic-ui-react';

// Other Components
import Routes from './routes';
import AdminSidebar from './components/admin/admin-sidebar'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      newPasswordConfirm: ''
    };
  }

  componentDidMount() {
    this.props.fetchInitialData();
  }

  render() {
    console.log(this.props, 'navbar props')
    return (
      <div>
        {this.props.user.id && this.props.user.needsPasswordReset ? this.renderPasswordResetModal() : null}
        <Navbar />
        {this.props.user.isAdmin? <AdminSidebar/>: <div/>}
        <Routes />
        
      </div>
    );
  }

  renderPasswordResetModal() {
    return (
      <Modal open={this.props.user.needsPasswordReset} basic size="small">
        <Header icon="lock" content="Password Reset Required" />
        <Modal.Content>
          <p>
            An administrator has requested that you reset your password. Please provide a new password below.
          </p>
          <Grid columns="equal" divided>
            <Grid.Column>
              <Form.Input
                fluid
                label="Password"
                type="password"
                onChange={({ target }) => this.setState({ newPassword: target.value })}
                value={this.state.newPassword}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                fluid
                label="Confirm Password"
                type="password"
                onChange={({ target }) => this.setState({ newPasswordConfirm: target.value })}
                value={this.state.newPasswordConfirm}
              />
            </Grid.Column>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => this.props.doPasswordReset(this.state.newPassword)}
            disabled={
              this.state.newPassword.trim().length === 0 ||
              this.state.newPassword !== this.state.newPasswordConfirm
            }
            color="green"
            inverted>
            <Icon name="checkmark" /> Save Password
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapState = state => ({
  user: state.user
});


const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(refreshProductList());
    dispatch(refreshCategoryList());
    dispatch(fetchAllOrders());
    dispatch(restoreCart());
  },
  doPasswordReset: newPassword => {
    dispatch(changePassword(newPassword));
  }
});

export default withRouter(connect(mapState, mapDispatch)(App));
