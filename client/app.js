import React from 'react';
import { connect } from 'react-redux';
import { refreshProductList, refreshCategoryList } from './store';
import { Navbar } from './components';
import { ReviewForm} from './components';
import { Route, withRouter } from 'react-router-dom';

// Cart Components
import CartList         from './components/cart/cart-list';
import CartNavbarButton from './components/cart/cart-navbar-button';

// Product Components
import ProductList   from './components/products/product-list';
import SingleProduct from './components/products/single-product';
import EditProduct   from './components/products/edit-product';

// Review Components
import ProductReviews from './components/reviews/product-reviews';

// Other Components
import Routes from './routes';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchInitialData();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
        <Route exact path="/products" component={ProductList} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/review" component={ReviewForm} />
        <Route exact path="/products/:id/reviews" component={ProductReviews} />
        <Route exact path="/products/:id/edit" component={EditProduct} />
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
