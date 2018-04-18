import React, { Component } from 'react';
import CartListItem from './cart-list-item';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const CartList = ({ cart }) => {
  const itemsInCart = cart.reduce((total, currentElement) => total += currentElement.quantity, 0);
  return (
    <div>
      <h2>Shopping Cart ({itemsInCart} items)</h2>
      {cart.map(cartItem => (
        <CartListItem
          key={cartItem.product.id}
          product={cartItem.product}
          currentQuantity={cartItem.quantity}
        />
      ))}
    </div>
  );
};

// const mapStateToProps = ({ products, cart }) => ({ products, cart });
const mapStateToProps = state => {
  // Since the cart store only keeps track of productId and quantity, we'll go ahead and copy
  // the appropriate Product objects from state.projects into our `cartArray` prop.  That way, the
  // component can display the data associated with each productId.
  const cart = { ...state.cart };
  const cartArray = [];
  for (const key in cart) {
    if (cart.hasOwnProperty(key)) {
      const cartItem = cart[key];
      cartItem.product = state.products.filter(element => element.id === cartItem.productId)[0];
      cartArray.push(cartItem);
    }
  }
  return { cart: cartArray };
};
export default connect(mapStateToProps, null)(CartList);
