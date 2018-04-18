import React from 'react';
import { connect } from 'react-redux';

const CartNavbarButton = props => {
  const itemsInCart = props.cart.reduce((total, currentElement) => total += currentElement.quantity, 0);
  return <button>🛒 My Cart ({`${itemsInCart} item${itemsInCart !== 1 ? 's' : ''}`})</button>;
};

const mapState = state => ({
  products: state.products,
  cart: state.cart
});

export default connect(mapState, null)(CartNavbarButton);
