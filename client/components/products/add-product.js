import PropTypes            from 'prop-types'
import React, { Component } from 'react'
import { connect }          from 'react-redux'
import {
    Button,
    Checkbox,
    Container,
    Form,
    Input,
    TextArea,
    Message
} from 'semantic-ui-react'

import { addProduct } from '../../store/products'

class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.categories = []
        this.isDirty = false
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
        this.isDirty = false;
    }

    addCategories = (event, { value }) => {
        this.categories.includes(value)
            ? this.categories = this.categories.filter(categoryId => value !== categoryId)
            : this.categories.push(value)

        this.setState({ categoriesId: this.categories })
    }

    handleSubmit = () => {
        this.props.addProduct(this.state)
        this.isDirty = true;
    }

    render() {
        const { categories } = this.props

        return (
            <Container text className="viewHeight">
                <Form onSubmit={this.handleSubmit} error>
                    <Form.Group>
                        <Form.Field
                            control={Input}
                            label="Title"
                            placeholder=""
                            name="title"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            control={Input}
                            label="Price"
                            placeholder=""
                            name="price"
                            value={this.state.price}
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            control={Input}
                            label="Inventory"
                            placeholder=""
                            name="inventory"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group inline>
                        <label>Categories</label>
                        <ul>
                            {categories.length
                                ? categories.map(category => (
                                    <Form.Field
                                        control={Checkbox}
                                        label={category.name}
                                        name="categoryId"
                                        value={category.id}
                                        onChange={this.addCategories}
                                        key={category.id}
                                    />
                                ))
                                : <div />
                            }
                        </ul>
                        {
                            this.categories.length
                                ? <div />
                                : <Message
                                    error
                                    header="Warning:"
                                    content="Must have at least 1 category assigned"
                                />
                        }
                    </Form.Group>
                    <Form.Field
                        control={TextArea}
                        label="Description"
                        placeholder=""
                        name="description"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <Form.Group inline>
                        <Form.Field
                            control={Button}
                            content="Confirm"
                        />
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}

AddProduct.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = ({ categories }) => ({ categories })

const mapDispatch = { addProduct }

export default connect(mapStateToProps, mapDispatch)(AddProduct)
