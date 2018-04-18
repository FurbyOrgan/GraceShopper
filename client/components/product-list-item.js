import React, { Component } from 'react';
import ProductList from './product-list';

const ProductListItem = ({ product }) => {
  return (
    <div>
      <h3>{product.title}</h3>
    </div>
  );
};

export default ProductListItem;
