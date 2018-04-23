import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Container, Form, Input, TextArea } from 'semantic-ui-react';
import {addProduct} from '../../store/products'

class AddProduct extends Component {
    constructor (props){
        super(props)
        this.state = {
    
        }
        this.categories = []
    }


    handleChange = ( event, {value}) => { 
    console.log('state: ', this.state)
    console.log(this.props.currentProduct, "current product")
        const name = event.target.name;
        //const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState( { [name]: event.target.value})
    }
    addCategories = (event, {value}) =>{
        if(!this.categories.includes(value)){
            this.categories.push(value)

        }else{
            this.categories = this.categories.filter( categoryId => value !== categoryId )
        }
        
        this.setState( {'categoriesId' : this.categories} )

    }

    handleSubmit = async () => {
        const product = {
            title: this.state.title,
            price: this.state.price,
            inventory: this.state.inventory,
            description: this.state.description,
        }
        await this.props.addProduct(product)
    }


    render() {

        const categories = this.props.categories;
        const { value } = this.state
        console.log('state: ', this.state, 'currentProd', this.props.currentProduct)
        return (
            <Container text>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Field control={Input} label="Title" placeholder="" name='title' value={this.state.value} onChange={this.handleChange} />
                        <Form.Field control={Input} label="Price" placeholder="" name='price' value={this.state.price} onChange={this.handleChange}/>
                        <Form.Field control={Input} label="Inventory" placeholder="" name='inventory' value={this.state.value} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group inline>
                        <label>Categories</label>
                        <ul>
                        {categories.length? categories.map(category => <Form.Field control={Checkbox} label={category.name} name='categoryId' value={category.id}  onChange={this.addCategories} key ={category.id}/>):<div/>}
                        </ul>
                    </Form.Group>
                    <Form.Field control={TextArea} label="Description" placeholder="" name='description' value={this.state.value} onChange={this.handleChange}/>
                    <Form.Group inline>
                        <Form.Field control={Button} content='Confirm' />
                        <Form.Field control={Button} content='Cancel' />
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = ({categories}, ownProps) => {
    return {
        categories: categories
    }
}
const mapDispatch = {addProduct};
export default connect(mapStateToProps, mapDispatch)(AddProduct);