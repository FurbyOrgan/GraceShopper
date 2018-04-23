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
  Item,
  Segment,
  Divider
} from 'semantic-ui-react';
import { Control, LocalForm as ReduxForm, actions } from 'react-redux-form';
import withManagedForm from '../common/managed-form';
import { makeOrder } from '../../store';
import { withRouter } from 'react-router-dom';

// Valdiators
const required = { test: str => str && str.length, message: 'This field is required.' };
const isEmail = { test: str => /\S+@\S+\.\S+/.test(str), message: 'Must be a valid email address.' };
const formSchema = {
  orderFirstName: { validators: [required] },
  orderLastName: { validators: [required] },
  orderEmail: { validators: [required, isEmail] },
  shippingStreet: { validators: [required] },
  shippingCity: { validators: [required] },
  shippingState: { validators: [required] },
  shippingZipCode: { validators: [required] },
  billingStreet: { validators: [required] },
  billingCity: { validators: [required] },
  billingState: { validators: [required] },
  billingZipCode: { validators: [required] }
};

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };

    if (props.user.id) {
      props.formHelpers.setFieldValue('orderFirstName', props.user.firstName);
      if (!props.formData.orderFirstName.touched) props.formHelpers.setFieldValue('orderLastName', props.user.lastName);
      if (!props.formData.orderFirstName.touched) props.formHelpers.setFieldValue('orderEmail', props.user.email);
    }
  }

  componentWillReceiveProps(props) {
    if (props.user.id) {
      if (!props.formData.orderFirstName.touched) props.formHelpers.setFieldValue('orderFirstName', props.user.firstName);
      if (!props.formData.orderFirstName.touched) props.formHelpers.setFieldValue('orderLastName', props.user.lastName);
      if (!props.formData.orderFirstName.touched) props.formHelpers.setFieldValue('orderEmail', props.user.email);
    }
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
            onUpdate={form => this.onFormUpdate(form)}
            onChange={values => this.onFormChange(values)}
            getDispatch={dispatch => (this.formDispatch = dispatch)}>
            {this.renderCheckoutStep()}
            <Divider horizontal />
            {this.renderButtons()}
          </ReduxForm>
        </Segment>
      </Container>
    );
  }

  onFormSubmit = checkoutData => {
    console.log('onFormSubmit');
    this.props.doMakeOrder(checkoutData, this.props.cart);
    console.trace();
  };

  onFormChange = data => {};

  onFormUpdate = data => {};

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

  renderProfileStep() {
    const ManagedInput = this.props.formComponents.ManagedInput;
    return (
      <div>
        {this.props.user.id ? (
          <p>You're already logged in, so we've filled this out for you.</p>
        ) : (
          <p>You're checking out as a guest. Please provide your contact information.</p>
        )}
        <div>
          <Form.Group widths="equal">
            <ManagedInput component={Form.Input} name="orderFirstName" label="First Name" />
            <ManagedInput component={Form.Input} name="orderLastName" label="Last Name" />
            <ManagedInput component={Form.Input} name="orderEmail" label="Email" />
          </Form.Group>
        </div>
      </div>
    );
  }

  renderShippingStep() {
    const ManagedInput = this.props.formComponents.ManagedInput;
    return (
      <div>
        <ManagedInput component={Form.Input} name="shippingStreet" label="Shipping Street Address" />
        <Form.Group widths="equal">
          <ManagedInput component={Form.Input} name="shippingCity" label="City" />
          <ManagedInput component={Form.Input} name="shippingState" label="State" />
          <ManagedInput component={Form.Input} name="shippingZipCode" label="ZIP Code" />
        </Form.Group>
      </div>
    );
  }

  renderBillingStep() {
    const ManagedInput = this.props.formComponents.ManagedInput;
    return (
      <div>
        <ManagedInput component={Form.Input} name="billingStreet" label="Billing Street Address" />
        <Form.Group widths="equal">
          <ManagedInput component={Form.Input} name="billingCity" label="City" />
          <ManagedInput component={Form.Input} name="billingState" label="State" />
          <ManagedInput component={Form.Input} name="billingZipCode" label="ZIP Code" />
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
          <Button onClick={() => console.log('Submit Clicked')} type="submit">
            Submit
          </Button>
        ) : (
          <Button
            disabled={this.state.step === 3}
            onClick={() => this.setState({ step: this.state.step + 1 })}>
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

export default withRouter(withManagedForm(formSchema, connect(mapState, mapDispatch)(CheckoutForm)));
