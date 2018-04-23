import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import ProductList from './product-list';
import CartAddButton from '../cart/cart-add-button';
import { Image as ImageComponent, Item } from 'semantic-ui-react'

const ProductListItem = ({ product }) => {
  return (
    <Item>
      <Item.Image src={product.imageUrl} />
      <Item.Content>
        <Item.Header as={Link} to={`/products/${product.id}`}>{product.title}</Item.Header>
        <Item.Meta>
          <span className='cinema'>{product.price}</span>
        </Item.Meta>
        
        <Item.Description>{product.description}</Item.Description>
        <Item.Extra>
          {product.inventory > 0? <CartAddButton product={product} />: <h4>Item out of stock</h4>}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default ProductListItem;
