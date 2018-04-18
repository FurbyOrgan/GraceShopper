import React from 'react';
import { connect } from 'react-redux';
import { refreshProductList } from './store';
import { Navbar } from './components';
import { Route, withRouter } from 'react-router-dom'

import Routes from './routes';
import CartList from './components/cart/cart-list';
import CartNavbarButton from './components/cart/cart-navbar-button';
import ProductList from './components/products/product-list';
import SingleProduct from './components/products/single-product';
import DummyHome from './components/dummyhome'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchProductList();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
        <Route exact path="/" component={DummyHome} />
        <Route exact path="/products" component={ProductList} />
        <Route exact path="/products/:id" component={SingleProduct} />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  fetchProductList: () => dispatch(refreshProductList())
});

export default withRouter(connect(null, mapDispatch)(App));
