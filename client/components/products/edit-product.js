import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Container, Form, Input, TextArea } from 'semantic-ui-react';

/**
 * Render something with data in form matching the data in the database
 */
class EditProduct extends Component {
    state = {}

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentProduct === prevState.currentProduct) {
            return null;
        } else {
            return {
                currentProduct: nextProps.currentProduct
            }
        }
        console.log("nextProps: ", nextProps.currentProduct);
        console.log("prevState: ", prevState)
        console.log("ownprops: ", ownProps)
        // if (nextProps.currentProduct !== prevState.currentProduct)
    }

    handleChange = (key, value) => this.setState({
        currentProduct
    })

    render() {
        const product = this.props.currentProduct;
        console.log('state: ', this.state)
        if(!product) return(<div />)
        return (
            <Container text>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Field control={Input} label="Title" placeholder="Product Title" value={product.title} onChange={this.handleChange}/>
                        <Form.Field control={Input} label="Price" placeholder="Product Price" value={product.price}/>
                        <Form.Field control={Input} label="Inventory" placeholder="Product Inventory" value={product.inventory}/>
                    </Form.Group>
                    <Form.Group inline>
                        <label>Categories</label>
                        <Form.Field control={Checkbox} label='Category 1' />
                        <Form.Field control={Checkbox} label='Category 2' />
                    </Form.Group>
                    <Form.Field control={TextArea} label="Description" placeholder="Product Description" value={product.description}/>
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