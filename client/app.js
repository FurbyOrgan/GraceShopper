import React from 'react';
import { connect } from 'react-redux';
import { refreshProductList, refreshCategoryList, restoreCart } from './store';
import { Navbar } from './components';
import { ReviewForm} from './components'
import { Route, withRouter } from 'react-router-dom'

import Routes from './routes';
import CartList from './components/cart/cart-list';
import CartNavbarButton from './components/cart/cart-navbar-button';
import ProductList from './components/products/product-list';
import SingleProduct from './components/products/single-product';
import DummyHome from './components/dummyhome'
import ProductReviews from './components/reviews/product-reviews'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchInitialData();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
        <Route exact path="/" component={DummyHome} />
        <Route exact path="/products" component={ProductList} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/review" component={ReviewForm} />
        <Route exact path="/products/:id/reviews" component={ProductReviews} />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(refreshProductList())
    dispatch(refreshCategoryList())
    dispatch(restoreCart())
  }
});

export default withRouter(connect(null, mapDispatch)(App));
