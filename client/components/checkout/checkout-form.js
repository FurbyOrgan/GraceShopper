import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Button, Form, Input, Segment } from 'semantic-ui-react';
import { Control, LocalForm as ReduxForm } from 'react-redux-form';

// Valdiators
const required = str => str && str.length;
const isEmail = str => /\S+@\S+\.\S+/.test(str);
const validators = {
  orderFirstName: { required },
  orderLastName: { required },
  orderEmail: { required, isEmail }
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
      <div>
        <h1>Checkout</h1>
        <Segment>
          {this.renderBreadcrumb()}

          <ReduxForm
            model="checkout"
            onSubmit={checkoutData => this.onFormSubmit(checkoutData)}
            onUpdate={form => this.onFormUpdate(form)}
            onChange={values => this.onFormChange(values)}
          >
            <div>
              <Form>{this.renderCheckoutStep()}</Form>
            </div>
          </ReduxForm>
          <Button
            disabled={this.state.step === 0}
            onClick={() => this.setState({ step: this.state.step - 1 })}
          >
            Prev
          </Button>
          <Button
            disabled={this.state.step === 3}
            onClick={() => this.setState({ step: this.state.step + 1 })}
          >
            Next
          </Button>
        </Segment>
      </div>
    );
  }

  onFormSubmit = checkoutData => {
    console.log(checkoutData);
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
      <Breadcrumb size="massive">
        <Breadcrumb.Section active={step === 0}>Contact</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active={step === 1}>Shipping</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active={step === 2}>Billing</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active={step === 3}>Review Order</Breadcrumb.Section>
      </Breadcrumb>
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
        <h3>Contact Information</h3>
        {this.props.user.id ? (
          <p>You're already logged in, so we've filled this out for you.</p>
        ) : (
          <p>You're checking out as a guest. Please provide your contact information.</p>
        )}
        <div>
          <Form.Group widths="equal">
            {this.makeSemanticReduxInput('First Name', '.orderFirstName')}
            {this.makeSemanticReduxInput('Last Name', '.orderLastName')}
          </Form.Group>
          {this.makeSemanticReduxInput('Email', '.orderEmail')}
        </div>
      </div>
    );
  }

  renderShippingStep() {
    return (
      <div>
        <h3>Provide your shipping information</h3>
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
        <Button type="submit">Submit</Button>
      </div>
    );
  }
}

const mapState = state => ({
  products: state.products,
  user: state.user
});

export default connect(mapState, null)(CheckoutForm);
