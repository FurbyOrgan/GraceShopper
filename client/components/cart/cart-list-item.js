import React, { Component } from 'react';
import CartAddButton from './cart-add-button';

const CartListItem = ({ product, currentQuantity}) => {
  return (
    <div>
      <h3>{product.title}</h3>
      <p>Currently {currentQuantity} in cart.</p>
      <CartAddButton product={product} />
    </div>
  );
};

export default CartListItem;
