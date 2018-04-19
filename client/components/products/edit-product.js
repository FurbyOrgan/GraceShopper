import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Container, Form, Input, TextArea } from 'semantic-ui-react';

/**
 * Render something with data in form matching the data in the database
 */
class EditProduct extends Component {

    //handleChange = (e, { value }) => this.setState({ value })

    render() {
        console.log(this.props.currentProduct);
        // if(!product) return(<div />)
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
                        <Form.Field control={Button} content='Confirm' />
                        <Form.Field control={Button} content='Cancel' />
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentProduct: state.products.filter(product => {
            return product.id === Number(ownProps.match.params.id)
        })[0],
    }
}

export default connect(mapStateToProps, null)(EditProduct);