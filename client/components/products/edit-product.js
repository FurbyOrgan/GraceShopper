import React, { Component } from 'react'
import { connect }          from 'react-redux'

import {
    Button,
    Checkbox,
    Container,
    Form,
    Input,
    TextArea
} from 'semantic-ui-react'

import { updateProduct } from '../../store/products'


class EditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.isNotDirty = true;
        this.categories = []
    }

    componentDidMount = () => {
        this.setState(this.props.currentProduct)
        this.categories = this.props.currentProduct.categories.map(category => category.id)
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    addCategories = (event, { value }) => {
        this.categories.includes(value)
            ? this.categories = this.categories.filter(categoryId => value !== categoryId)
            : this.categories.push(value)

        this.setState({ categoriesId: this.categories })
        this.isDirty = true
    }

    handleSubmit = () => {
        this.props.updateProduct(this.props.currentProduct.id, this.state)
    }

    render() {
        const product = this.props.currentProduct;
        const categories = this.props.categories;

        if (!product) return <div />

        return (
            <Container text className="viewHeight">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Field
                            control={Input}
                            label="Title"
                            name="title"
                            onChange={this.handleChange}
                            placeholder={product.title}
                            value={this.state.title}
                        />
                        <Form.Field
                            control={Input}
                            label="Price"
                            name="price"
                            onChange={this.handleChange}
                            placeholder={product.price}
                            value={this.state.price}
                        />
                        <Form.Field
                            control={Input}
                            label="Inventory"
                            onChange={this.handleChange}
                            name="inventory"
                            placeholder={product.inventory}
                            value={this.state.inventory}
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
                                        checked={this.categories.includes(category.id)}
                                    />
                                ))
                                : <div />}
                        </ul>
                    </Form.Group>
                    <Form.Field
                        control={TextArea}
                        label="Description"
                        placeholder={product.description}
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                    />
                    <Form.Group inline>
                        <Form.Field control={Button} content="Confirm" />
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = ({ products, categories }, ownProps) => ({
    currentProduct: products.filter(product => product.id === Number(ownProps.match.params.id))[0],
    categories: categories
})

const mapDispatch = { updateProduct };

export default connect(mapStateToProps, mapDispatch)(EditProduct)
