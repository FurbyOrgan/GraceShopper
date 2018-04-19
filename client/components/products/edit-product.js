import React, { Component } from 'react';
import { Button, Checkbox, Container, Form, Input, TextArea } from 'semantic-ui-react';

/**
 * v1 - render something
 */
export default class EditProduct extends Component {

    //handleChange = (e, { value }) => this.setState({ value })

    render() {
        return (
            <Container text>
                <Form>
                    <Form.Group>
                        <Form.Field control={Input} label="Title" placeholder="Product Title" />
                        <Form.Field control={Input} label="Price" placeholder="Product Price" />
                        <Form.Field control={Input} label="Inventory" placeholder="Product Inventory" />
                    </Form.Group>
                    <Form.Group inline>
                        <label>Categories</label>
                        <Form.Field control={Checkbox} label='Category 1' />
                        <Form.Field control={Checkbox} label='Category 2' />
                    </Form.Group>
                    <Form.Field control={TextArea} label="Description" placeholder="Product Description" />
                    <Form.Group inline>
                        <Form.Field id='form-button-control-public' control={Button} content='Confirm' />
                        <Form.Field id='form-button-control-public' control={Button} content='Cancel' />
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}