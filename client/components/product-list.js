import React, { Component } from 'react';
import ProductListItem from './product-list-item';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  console.log(products)
  return (
    <div>
      <h2>Product List</h2>
      {products.map(productElement =>
        <ProductListItem key={productElement.id} product={productElement} />
      )
    }
    </div>
  );
};

const mapStateToProps = ({ products }) => ({ products });
export default connect(mapStateToProps, null)(ProductList);
