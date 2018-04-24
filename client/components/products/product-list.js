import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container,
         Header,
         Item, } from 'semantic-ui-react'

import ProductListItem from './product-list-item';
import CategoryLabel from '../categories/category-label'


const ProductList = ({ products }, {reviews}) => {
console.log(reviews )
  
  return (
    <Container text>
      {!products.length? <h3>No products available</h3>: <div/>}
      <Item.Group divided>
        {products.map(productElement =>
          <ProductListItem key={productElement.id} product={productElement} review={2}/>
        )}
      </Item.Group>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => {
  if (ownProps.filteredProducts) {
    return { products: ownProps.filteredProducts, reviews: state.reviews };
  } else {
    return { products: state.products, reviews: state.reviews };
  }
};
export default connect(mapStateToProps, null)(ProductList);
