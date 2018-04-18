import React from 'react';
import { connect } from 'react-redux';
import { refreshProductList } from './store';
import { Navbar } from './components';
import Routes from './routes';
import ProductList from './components/product-list';
import CartNavbarButton from './components/cart/cart-navbar-button';
import CartList from './components/cart/cart-list';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchProductList();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
        <h1>ProductList component</h1>
        <ProductList />
        <h1>CartNavbarButton component</h1>
        <CartNavbarButton />
        <h1>CartList component</h1>
        <CartList />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  fetchProductList: () => dispatch(refreshProductList())
});

export default connect(null, mapDispatch)(App);
