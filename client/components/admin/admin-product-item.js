import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Grid, Image as ImageComponent, Item, Label, Button, Dropdown, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';

import CategoryLabel from '../categories/category-label'
import {removeProduct} from '../../store/products'


    class AdminProductItem  extends Component {
        constructor (props){
            super(props)
         
        }
    
  

    render (){ 
        const product = this.props.product
  return (
    <Item>
      <Item.Image src={product.imageUrl} />
      
      <Item.Content>
        <Item.Header as={Link} to={`/products/${product.id}/edit`}>{product.title}</Item.Header>
     
      
    
            <Item.Meta>
              <Label tag>${product.price}</Label>
            </Item.Meta>
            <Item.Description>{product.description}</Item.Description>

        <Item.Extra>
          {product.inventory > 0? <h4>{product.inventory} in stock</h4>: <h4>Item out of stock</h4>}
        </Item.Extra>  
         <Item.Extra>
          {product.categories.map(category => 
            <CategoryLabel key={category.id} id={category.id}/>
          )}
        </Item.Extra>
        <Item.Extra>
        <Button.Group color='teal' size='tiny'>
        <Button as={Link} to={`/products/${product.id}/edit`}>Edit</Button>
        <Button.Or />
        <Button onClick={() => this.props.removeProduct(product.id)}>Delete</Button>
          </Button.Group>
        </Item.Extra> 
      </Item.Content>
    </Item>
  );
}

};
const mapState = ({product}) => ({product})

const mapDispatch = {removeProduct}
export default connect(null, mapDispatch)(AdminProductItem);