import React from 'react';
import { connect } from 'react-redux';
import { refreshProductList, refreshCategoryList } from './store';
import { Navbar } from './components';
import { Route, withRouter } from 'react-router-dom'

import Routes from './routes';
import ProductList from './components/product-list';
import CartNavbarButton from './components/cart/cart-navbar-button';
import CartList from './components/cart/cart-list';
import DummyHome from './components/dummyhome'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchInitialData();
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
        <Route exact path="/" component={DummyHome} />
        <Route exact path="/products" component={ProductList} />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(refreshProductList())
    dispatch(refreshCategoryList())
  }
});

export default withRouter(connect(null, mapDispatch)(App));
