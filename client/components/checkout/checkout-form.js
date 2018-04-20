import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'react-redux-form';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
  }

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        {this.renderBreadcrumb()}
        <form onSubmit={this.props.handleSubmit}>{this.renderCheckoutStep()}</form>
        <Button disabled={this.state.step === 0} onClick={() => this.setState({ step: this.state.step - 1 })}>
          Prev
        </Button>
        <Button disabled={this.state.step === 2} onClick={() => this.setState({ step: this.state.step + 1 })}>
          Next
        </Button>
      </div>
    );
  }

  renderBreadcrumb() {
    const step = this.state.step;
    return (
      <Breadcrumb size="big">
        <Breadcrumb.Section active={step === 0}>Shipping</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active={step === 1}>Billing</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active={step === 2}>Review Order</Breadcrumb.Section>
      </Breadcrumb>
    );
  }

  renderCheckoutStep() {
    switch (this.state.step) {
      case 0:
        return this.renderShippingStep();
      case 1:
        return this.renderBillingStep();
      case 2:
        return this.renderReviewStep();
      default:
        return <p>This shouldn't happen...</p>;
    }
  }

  onFormSubmit = value => {};

  renderShippingStep() {
    return (
      <div>
        <h3>Provide your shipping information</h3>
        <div>
          <label>First Name</label>
          <Field name="firstName" component="input" type="text" />
        </div>
        <div>
          <label>Last Name</label>
          <Field name="lastName" component="input" type="text" />
        </div>
        <div>
          <label>Email</label>
          <Field name="email" component="input" type="email" />
        </div>
      </div>
    );
  }

  renderBillingStep() {
    return (
      <div>
        <h3>Provide your billing information</h3>
      </div>
    );
  }

  renderReviewStep() {
    return (
      <div>
        <h3>Review your order</h3>
      </div>
    );
  }
}

const mapState = state => ({
  products: state.products
});

export default reduxForm({ form: 'checkout' })(connect(mapState, null)(CheckoutForm));
