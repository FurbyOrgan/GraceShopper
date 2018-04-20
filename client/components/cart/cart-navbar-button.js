import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Label } from 'semantic-ui-react'

const CartNavbarButton = props => {
  const itemsInCart = props.cart.reduce((total, currentElement) => total += currentElement.quantity, 0);
  return <div className="cart"><Button className="ui teal labeled icon button" size="tiny"><i className="cart icon"></i> My Cart ({`${itemsInCart} item${itemsInCart !== 1 ? 's' : ''}`})</Button></div>;
};

const mapState = state => ({
  products: state.products,
  cart: state.cart
});

export default connect(mapState, null)(CartNavbarButton);
