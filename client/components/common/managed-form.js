import React from 'react';

const withManagedForm = (schema, WrappedComponent) => {
  if (typeof schema !== 'object' || Object.keys(schema) === 0) throw Error('withForm expects a schema definition as the first argument.');

  const initialFormData = {};

  for (const field in schema) {
    if (schema.hasOwnProperty(field)) {
      const fieldObject = schema[field];
      initialFormData[field] = {
        value: fieldObject.initialValue || '',
        dirty: false,
        errors: [],
        validators: fieldObject.validators || []
      };
    }
  }

  return class ManagedForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        formData: initialFormData
      };

      this.ManagedInput = parentProps => {
        const propList = {
          error: !!(
            this.state.formData[parentProps.name].errors.length && this.state.formData[parentProps.name].dirty
          ),
          onChange: this.onFieldChanged,
          onBlur: this.onFieldFocusLost,
          onFocus: this.onFieldFocusGained,
          value: this.state.formData[parentProps.name].value
        };

        // Use destructuring to remove `component` from parentProps
        const { component, ...propsWithoutComponent } = parentProps
        if (component) {
          return <parentProps.component {...propList} {...propsWithoutComponent} />;
        } else {
          return <input {...propList} {...propsWithoutComponent} />;
        }
      };
    }

    setValidators = validators => {
      this.setState({ validators });
    };

    onFieldFocusGained = ({ target }) => {
      const key = target.name;
      const formData = { ...this.state.formData };
      formData[key].touched = true;
      this.setState({ formData });
    };

    onFieldFocusLost = ({ target }) => {
      const key = target.name;
      const formData = { ...this.state.formData };
      // console.log('ManagedForm: onFieldFocusLost', key);
      formData[key].dirty = true;
      this.setState({ formData }, this.validateForm);
    };

    onFieldChanged = ({ target }) => {
      const key = target.name;
      const formData = { ...this.state.formData };
      // console.log('ManagedForm: onFieldChanged', key, formData[key]);
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
      for (const fieldName in this.state.formData) {
        if (this.state.formData.hasOwnProperty(fieldName)) {
          const validatorsForField = this.state.formData[fieldName].validators;

          // ...then loop through the validators for each field.
          validatorsForField.forEach(validator => {
            const field = formData[fieldName];

            // Call the validator's test function on the field's value.  If it returns false,
            // use the validator's message property to add an error message to our field's errors.
            if (!validator.test(field.value)) {
              field.errors.push(validator.message);
            }
          });
        }
      }

      this.setState({ formData });
    };

    setFieldValue = (fieldName, value) => {
      const formData = { ...this.state.formData };
      if (formData[fieldName].value !== value) {
        formData[fieldName].value = value;
        this.setState({ formData });
      }
    };

    render = () => (
      <WrappedComponent
        {...this.props}
        formData={this.state.formData}
        formEvents={{ onChange: this.onFieldChanged, onBlur: this.onFieldFocusLost }}
        formComponents={{ ManagedInput: this.ManagedInput }}
        formHelpers={{ setFieldValue: this.setFieldValue }}
      />
    );
  };
};

// const ManagedInput = props => {
//   if (props.component) {
//     return <props.component onBlur={} {...props} />
//   }
// }

export default withManagedForm;
