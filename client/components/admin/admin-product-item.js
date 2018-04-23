import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Grid, Image as ImageComponent, Item, Label, Button, Dropdown, Icon } from 'semantic-ui-react'

import CategoryLabel from '../categories/category-label'

const AdminProductItem = ({ product }) => {
   

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
        <Button>Delete</Button>
          </Button.Group>
        </Item.Extra> 
      </Item.Content>
    </Item>
  );
};


export default AdminProductItem;