import React, { Component } from 'react';
import ProductList from './product-list';
import CartAddButton from './cart/cart-add-button';

const ProductListItem = ({ product }) => {
  return (
    <div>
      <h3>{product.title}</h3>
      <CartAddButton product={product} />
    </div>
  );
};

export default ProductListItem;
