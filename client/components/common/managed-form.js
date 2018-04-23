import React from 'react';

const withManagedForm = childComponent =>
  class ManagedForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        formData: {},
        validators: {}
      };
    }

    setValidators = validators => {
      this.setState({ validators });
    };

    onFieldFocusLost = ({ target }) => {
      const key = target.name;
      const formData = { ...this.state.formData };
      formData[key].dirty = true;
      this.setState({ formData }, this.validateForm);
    };

    onFieldChanged = ({ target }) => {
      const key = target.name;
      const formData = { ...this.state.formData };
      formData[key].value = target.value;
      this.setState({ formData }, this.validateForm);
    };

    clearErrors = formData => {
      Object.keys(formData).forEach(key => {
        formData[key].errors = [];
      });
      return formData;
    };

    // Loop through the validators object passed by child component.  Each key is a field, and
    // each value is an array of validator objects that should be called against that field's value.
    validateForm = () => {
      // Start off by clearing any existing errors on the field.
      const formData = this.clearErrors({ ...this.state.formData });

      // Loop through the list of fields...
      for (const fieldName in this.state.validators) {
        if (this.state.validators.hasOwnProperty(fieldName)) {
          const validatorsForField = this.state.validators[fieldName];

          // ...then loop through the validators for each field.
          validatorsForField.forEach(validator => {
            const field = formData[fieldName];

            // Call the validator's test function on the field's value.  If it returns false,
            // use the validator's message property to add an error message to our field's errors.
            if (!validator.test(field.value)) {
              field.errors.push(validator.message)
            }
          })
        }
      }

      this.setState({formData})
    };

    render = () => (
      <childComponent
        {...this.props}
        formData={this.state.formData}
        formHelpers={{ setValidators: this.setValidators }}
      />
    );
  };

export default withManagedForm;
