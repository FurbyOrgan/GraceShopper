import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Grid, Image as ImageComponent, Item, Label } from 'semantic-ui-react'

import ProductList from './product-list';
import CategoryLabel from '../categories/category-label'
import CartAddButton from '../cart/cart-add-button';

const ProductListItem = ({ product }) => {
  return (
    <Item>
      <Item.Image src={product.imageUrl} />
      <Item.Content>
        <Item.Header as={Link} to={`/products/${product.id}`}>{product.title}</Item.Header>
        <Grid columns={2}>
          <Grid.Column>

            <Item.Meta>
              <Label tag>${product.price}</Label>
            </Item.Meta>
            <Item.Description>{product.description}</Item.Description>
          </Grid.Column>
          <Grid.Column>
            <Item.Extra>
              <CartAddButton product={product} />
            </Item.Extra>
          </Grid.Column>
        </Grid>
        <Item.Extra>
          <CategoryLabel id={product.categories[0].id}/>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};


export default ProductListItem;
