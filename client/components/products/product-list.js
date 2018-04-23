import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container,
         Header,
         Item, } from 'semantic-ui-react'

import ProductListItem from './product-list-item';
import CategoryLabel from '../categories/category-label'


const ProductList = ({ products }) => {
  return (
    <Container text>
      <Header as='h2'>All Products</Header>
      <Item.Group divided>
        {products.map(productElement =>
          <ProductListItem key={productElement.id} product={productElement} />
        )}
      </Item.Group>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => {
  if (ownProps.filteredProducts) {
    return { products: ownProps.filteredProducts };
  } else {
    return { products: state.products };
  }
};
export default connect(mapStateToProps, null)(ProductList);
