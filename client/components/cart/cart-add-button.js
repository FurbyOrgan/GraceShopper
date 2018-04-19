import React from 'react';
import { connect } from 'react-redux';
import { updateQuantity } from '../../store';
import { In } from 'semantic-ui-react';

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
      <div className="ui left action input">
        <span>{this.state.dirty && this.state.error ? 'Error!' : ''}</span>
        <button onClick={this.onButtonClicked} disabled={this.state.error} className="ui orange labeled icon button">Add To Cart
        <i className="cart icon"></i>
        </button>
        <input type="text" onChange={this.onTextChange} value={this.state.quantityValue} />
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
