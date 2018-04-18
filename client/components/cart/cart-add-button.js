import React from 'react';
import { connect } from 'react-redux';
import { updateQuantity } from '../../store';

class CartAddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityValue: '',
      dirty: false,
      error: false
    };
  }

  componentDidMount = () => this.validateQuantity();

  onTextChange = ({ target }) => {
    this.setState({ quantityValue: target.value }, this.validateQuantity);
  };

  onButtonClicked = ({target}) => {
    this.props.doUpdateQuantity(this.props.product.id, parseInt(this.state.quantityValue))
  }

  validateQuantity = () => {
    const state = { ...this.state };
    state.error = false;

    if (state.quantityValue.trim().length === 0) state.error = true;
    const quantityNumber = parseInt(state.quantityValue);
    if (isNaN(quantityNumber)) state.error = true;
    if (quantityNumber < 0) state.error = true;
    this.setState(state);
  };

  render() {
    return (
      <div>
        <span>{this.state.dirty && this.state.error ? 'Error!' : ''}</span>
        <input type="text" onChange={this.onTextChange} value={this.state.quantityValue} />
        <button onClick={this.onButtonClicked} disabled={this.state.error}>Add To Cart</button>
      </div>
    );
  }
}

const mapState = state => ({
  products: state.products,
  cart: state.cart
});

const mapDispatch = dispatch => ({
  doUpdateQuantity: (productId, quantity) => {
    dispatch(updateQuantity(productId, quantity));
  }
})

export default connect(mapState, mapDispatch)(CartAddButton);
