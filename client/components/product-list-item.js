import React, { Component } from 'react';
import ProductList from './product-list';
import CartAddButton from './cart/cart-add-button';

const ProductListItem = ({ product }) => {
  return (
    <div>
      
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <CartAddButton className="cart icon" product={product} />
    </div>
  );
};

export default ProductListItem;
