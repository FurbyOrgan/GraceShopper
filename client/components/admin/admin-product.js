import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container,
         Header,
         Item, } from 'semantic-ui-react'

import AdminProductItem from './admin-product-item';
import CategoryLabel from '../categories/category-label'


const AdminProductList = ({ products }) => {
  return (
    <Container text>
      <Header as='h2'>View Inventory</Header>
      <Item.Group divided>
        {products.map(productElement =>
          <AdminProductItem key={productElement.id} product={productElement} />
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
export default connect(mapStateToProps, null)(AdminProductList);