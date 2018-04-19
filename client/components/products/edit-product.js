import React, { Component } from 'react';
import { Checkbox, Form, Input } from 'semantic-ui-react';

/**
 * v1 - render something
 */
export default class EditProduct extends Component {

    //handleChange = (e, { value }) => this.setState({ value })

    render() {
        return (
            <Form>
                <Form.Group widths="equal">
                    <Form.Field control={Input} label="title" placeholder="Product Title" />
                    <Form.Field control={Input} label="price" placeholder="Product Price" />
                    <Form.Field control={Input} label="inventory" placeholder="Product Inventory" />
                </Form.Group>
                <Form.Group inline>
                    <label>Categories</label>
                    <Form.Field control={Checkbox} label='Category 1' />
                    <Form.Field control={Checkbox} label='Category 2' />
                </Form.Group>
            </Form>
        )
    }
}