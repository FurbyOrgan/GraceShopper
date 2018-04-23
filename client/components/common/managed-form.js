import React from 'react';
/*
  ManagedForm is a higher-order component that provides form state management to the component it
  wraps.

  USAGE:
    Import managed-form.js, and wrap your component in withManagedForm.  You will need to provide a
    schema object as the first property.  The key should be the field's name, and it should have:
    - validators: an array of validator objects.  A validator object has a test function and as well
        as a message string that will be pushed onto a field's errors array if the test fails.
      initialValue: the initial value of the field, if any

    After wrapping your component in withManagedForm, ManagedForm will pass down various event
    handlers and helper methods to your component's props.

  PROPS:
    formData: This contains the state of the form.  Each field has the properties value, dirty, and errors
    formEvents: This contains references to ManagedForm's event handlers.  You should not override
      them, but you can invoke them manually if you need to do so.
    formHelpers: This contains a setFieldValue function, which allows you to programatically set
      the value of a field.  This will be done without triggering validation.
    formComponents: This contains ManagedInput and ManagedForm components, which are decorated
      <input> and <form> elements that have been bound to ManagedForm's event handlers.  These are
      the components you should use in your render method.

  MANAGEDINPUT PROPS
    component: If omitted, ManagedInput will wrap a standard <input> component.  If provided, it
      will wrap the component you provide.
    name: This should match the field provided in your formSchema.

  MANAGEDFORM PROPS
    component: If omitted, ManagedForm will wrap a standard <form> component.  If provided, it will
      wrap the component you provide.
    handleSubmit: This will be called when your form is submitted and passes validation.
    handleValidationFailed: This will be called when your form is submitted and fails validation.
*/
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

      this.setupManagedComponents();
      this.validateForm();
    }

    setupManagedComponents = () => {
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
        const { component, ...propsWithoutComponent } = parentProps;
        if (component) {
          return <parentProps.component {...propList} {...propsWithoutComponent} />;
        } else {
          return <input {...propList} {...propsWithoutComponent} />;
        }
      };

      this.ManagedForm = parentProps => {
        // Use destructuring to remove `component` from parentProps
        const { component, handleSubmit, handleValidationFailed, ...propsToPass } = parentProps;
        this.handleSubmit = handleSubmit;
        this.handleValidationFailed = handleValidationFailed;
        if (!parentProps.onSubmit) propsToPass.onSubmit = this.onFormSubmit;
        if (component) {
          return <parentProps.component {...propsToPass} />;
        } else {
          return <form {...propsToPass} />;
        }
      };
    };

    onFormSubmit = event => {
      console.log(this.state.formData);
      let hasErrors = false;
      for (const key in this.state.formData) {
        if (this.state.formData.hasOwnProperty(key)) {
          if (this.state.formData[key].errors.length) {
            hasErrors = true;
            break;
          }
        }
      }

      if (hasErrors) {
        return this.handleValidationFailed();
      }
      this.handleSubmit(this.state.formData);
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
        formEvents={{
          onChange: this.onFieldChanged,
          onBlur: this.onFieldFocusLost,
          onSubmit: this.onFormSubmit
        }}
        formComponents={{ ManagedInput: this.ManagedInput, ManagedForm: this.ManagedForm }}
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
