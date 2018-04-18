import React, { Component } from 'react';
import ProductListItem from './product-list-item';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ProductList = props => {
  return (
    <div>
      <h2>Product List</h2>
      <ProductListItem />
    </div>
  );
};

const mapStateToProps = ({ products }) => ({ products });
export default ProductList;
