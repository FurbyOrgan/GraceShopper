import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Container, Form, Input, TextArea } from 'semantic-ui-react';
import {updateProduct} from '../../store/products'


/**
 * Render something with data in form matching the data in the database
 */
class EditProduct extends Component {
    constructor (props){
        super(props)
        this.state = {
    
        }
        this.categories = []
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.currentProduct === prevState.currentProduct) {
    //         return null;
    //     } else {
    //         return {
    //             currentProduct: nextProps.currentProduct
    //         }
    //     }
    //     console.log("nextProps: ", nextProps.currentProduct);
    //     console.log("prevState: ", prevState)
    //     console.log("ownprops: ", ownProps)
    //     // if (nextProps.currentProduct !== prevState.currentProduct)
    // }

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

    handleSubmit =  () => {
        
         this.props.updateProduct(this.props.currentProduct.id, this.state)
    }


    render() {
        const product = this.props.currentProduct;
        const categories = this.props.categories;
        const { value } = this.state
        console.log('state: ', this.state, 'currentProd', this.props.currentProduct)
        if(!product) return(<div />)
        return (
            <Container text>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Field control={Input} label="Title" placeholder={product.title} name='title' value={this.state.value} onChange={this.handleChange} />
                        <Form.Field control={Input} label="Price" placeholder={product.price} name='price' value={this.state.price} onChange={this.handleChange}/>
                        <Form.Field control={Input} label="Inventory" placeholder={product.inventory} name='inventory' value={this.state.value} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group inline>
                        <label>Categories</label>
                        <ul>
                        {categories.length? categories.map(category => <Form.Field control={Checkbox} label={category.name} name='categoryId' value={category.id}  onChange={this.addCategories} key ={category.id}/>):<div/>}
                        </ul>
                    </Form.Group>
                    <Form.Field control={TextArea} label="Description" placeholder={product.description} name='description' value={this.state.value} onChange={this.handleChange}/>
                    <Form.Group inline>
                        <Form.Field control={Button} content='Confirm' />
                        <Form.Field control={Button} content='Cancel' />
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = ({products, categories}, ownProps) => {
    return {
        currentProduct: products.filter( product => product.id === Number(ownProps.match.params.id))[0],
        categories: categories
    }
}
const mapDispatch = {updateProduct};
export default connect(mapStateToProps, mapDispatch)(EditProduct);