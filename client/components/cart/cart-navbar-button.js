import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const CartNavbarButton = props => {
  const itemsInCart = props.cart.reduce((total, currentElement) => total += currentElement.quantity, 0);
  return <button onClick={() => props.history.push(props.to)} className="ui teal labeled icon button"><i className="cart icon" /> My Cart ({`${itemsInCart} item${itemsInCart !== 1 ? 's' : ''}`})</button>;
};

const mapState = state => ({
  products: state.products,
  cart: state.cart
});

export default withRouter(connect(mapState, null)(CartNavbarButton));
