import React from 'react';
import { connect } from 'react-redux';
import { ProductListItem } from '../';
import {
  Step,
  Button,
  Container,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Segment,
  Divider
} from 'semantic-ui-react';
import { Control, LocalForm as ReduxForm } from 'react-redux-form';
import { makeOrder } from '../../store';
import { withRouter } from 'react-router-dom';

// Valdiators
const required = str => str && str.length;
const isEmail = str => /\S+@\S+\.\S+/.test(str);
const validators = {
  orderFirstName: { required },
  orderLastName: { required },
  orderEmail: { required, isEmail },
  shippingStreet: { required },
  shippingCity: { required },
  shippingState: { required },
  shippingZipCode: { required },
  billingStreet: { required },
  billingCity: { required },
  billingState: { required },
  billingZipCode: { required }
};

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
  }

  render() {
    return (
      <Container>
        <Header as="h2">
          <Icon name="payment" />
          <Header.Content>Checkout</Header.Content>
        </Header>
        <Segment>
          {this.renderBreadcrumb()}
          <ReduxForm
            component={Form}
            model="checkout"
            onSubmit={checkoutData => this.onFormSubmit(checkoutData)}
            onUpdate={form => this.onFormUpdate(form)}
            onChange={values => this.onFormChange(values)}
          >
            {this.renderCheckoutStep()}
            <Divider horizontal />
            {this.renderButtons()}
          </ReduxForm>
        </Segment>
      </Container>
    );
  }

  onFormSubmit = checkoutData => {
    console.log(checkoutData);
    this.props.doMakeOrder(checkoutData, this.props.cart);
  };

  onFormChange = data => {
    console.log('Change', data);
  };

  onFormUpdate = data => {
    // this.setState({form: data})
  };

  renderBreadcrumb() {
    const step = this.state.step;
    return (
      <Step.Group widths="4">
        <Step active={step === 0} disabled={step < 0}>
          <Icon name="user circle" />
          <Step.Content>
            <Step.Title>Profile</Step.Title>
          </Step.Content>
        </Step>
        <Step active={step === 1} disabled={step < 1}>
          <Icon name="truck" />
          <Step.Content>
            <Step.Title>Shipping</Step.Title>
          </Step.Content>
        </Step>
        <Step active={step === 2} disabled={step < 2}>
          <Icon name="payment" />
          <Step.Content>
            <Step.Title>Billing</Step.Title>
          </Step.Content>
        </Step>
        <Step active={step === 3} disabled={step < 3}>
          <Icon name="checkmark box" />
          <Step.Content>
            <Step.Title>Review Order</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
    );
  }

  renderCheckoutStep() {
    switch (this.state.step) {
      case 0:
        return this.renderProfileStep();
      case 1:
        return this.renderShippingStep();
      case 2:
        return this.renderBillingStep();
      case 3:
        return this.renderReviewStep();
      default:
        return <p>This shouldn't happen...</p>;
    }
  }

  makeSemanticReduxInput = (labelName, modelName) => {
    const formField = props => {
      return <Form.Input label={labelName} placeholder={labelName} {...props} />;
    };
    return (
      <Control
        mapProps={{
          error: ({ fieldValue }) => (!fieldValue.pristine || fieldValue.touched) && !fieldValue.valid
        }}
        component={formField}
        validators={validators[modelName.substring(1)]}
        model={modelName}
        id={modelName}
      />
    );
  };

  renderProfileStep() {
    return (
      <div>
        {this.props.user.id ? (
          <p>You're already logged in, so we've filled this out for you.</p>
        ) : (
          <p>You're checking out as a guest. Please provide your contact information.</p>
        )}
        <div>
          <Form.Group widths="equal">
            {this.makeSemanticReduxInput('First Name', '.orderFirstName')}
            {this.makeSemanticReduxInput('Last Name', '.orderLastName')}
            {this.makeSemanticReduxInput('Email', '.orderEmail')}
          </Form.Group>
        </div>
      </div>
    );
  }

  renderShippingStep() {
    return (
      <div>
        {this.makeSemanticReduxInput('Shipping Address', '.shippingStreet')}
        <Form.Group widths="equal">
          {this.makeSemanticReduxInput('City', '.shippingCity')}
          {this.makeSemanticReduxInput('State', '.shippingState')}
          {this.makeSemanticReduxInput('ZIP Code', '.shippingZipCode')}
        </Form.Group>
      </div>
    );
  }

  renderBillingStep() {
    return (
      <div>
        {this.makeSemanticReduxInput('Billing Address', '.billingStreet')}
        <Form.Group widths="equal">
          {this.makeSemanticReduxInput('City', '.billingCity')}
          {this.makeSemanticReduxInput('State', '.billingState')}
          {this.makeSemanticReduxInput('ZIP Code', '.billingZipCode')}
        </Form.Group>
      </div>
    );
  }

  renderReviewStep() {
    return (
      <div>
        <Item.Group divided>
          {this.props.cart.map(cartItem => (
            <ProductListItem
              key={cartItem.product.id}
              product={cartItem.product}
              currentQuantity={cartItem.quantity}
            />
          ))}
        </Item.Group>
      </div>
    );
  }

  renderButtons() {
    return (
      <div>
        <Button disabled={this.state.step === 0} onClick={() => this.setState({ step: this.state.step - 1 })}>
          Back
        </Button>
        {this.state.step === 3 ? (
          <Button type="submit">Submit</Button>
        ) : (
          <Button
            disabled={this.state.step === 3}
            onClick={() => this.setState({ step: this.state.step + 1 })}
          >
            Proceed
          </Button>
        )}
      </div>
    );
  }
}

const mapState = state => {
  const cart = { ...state.cart };
  const cartArray = [];
  for (const key in cart) {
    if (cart.hasOwnProperty(key)) {
      const cartItem = cart[key];
      cartItem.product = state.products.filter(element => element.id === cartItem.productId)[0];
      if (cartItem.product) {
        cartArray.push(cartItem);
      }
    }
  }

  return {
    products: state.products,
    user: state.user,
    cart: cartArray
  };
};

const mapDispatch = (dispatch, ownProps) => ({
  doMakeOrder: (orderInfo, orderItems) => {
    dispatch(makeOrder(orderInfo, orderItems, ownProps.history));
  }
});

export default withRouter(connect(mapState, mapDispatch)(CheckoutForm));
