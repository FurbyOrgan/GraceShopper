import React, { Component } from 'react';
import ProductListItem from './product-list-item';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  return (
    <div>
      <h2>All Products</h2>
      {products.map(productElement => <ProductListItem key={productElement.id} product={productElement} />)}
    </div>
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
