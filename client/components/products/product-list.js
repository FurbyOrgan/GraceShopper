import React, { Component } from 'react';
import ProductListItem from './product-list-item';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Item } from 'semantic-ui-react'

const ProductList = ({ products }) => {
  return (
    <Container text>
      <h2>All Products</h2>
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
