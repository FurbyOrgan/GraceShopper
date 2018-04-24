import React from 'react';
import { connect } from 'react-redux';
import { refreshProductList, refreshCategoryList, restoreCart, fetchAllOrders } from './store';
import { Navbar } from './components';
import { ReviewForm} from './components';
import { Route, withRouter } from 'react-router-dom';

// Cart Components
import CartList         from './components/cart/cart-list';
import CartNavbarButton from './components/cart/cart-navbar-button';

// Product Components
import ProductList   from './components/products/product-list';
import SingleProduct from './components/products/single-product';
import EditProduct   from './components/products/edit-product'
//import DummyHome from './components/dummyhome';

// Review Components
import ProductReviews from './components/reviews/product-reviews';

// Other Components
import Routes from './routes';
import AdminSidebar from './components/admin/admin-sidebar'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchInitialData();
  }

  render() {
    console.log(this.props, 'navbar props')
    return (
      <div>
        <Navbar />
        {this.props.user.isAdmin? <AdminSidebar/>: <div/>}
        <Routes />
        
      </div>
    );
  }
}


const mapState = ({user}) => ({user})
const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(refreshProductList())
    dispatch(refreshCategoryList())
    dispatch(fetchAllOrders())
    dispatch(restoreCart())
  }
});

export default withRouter(connect(mapState, mapDispatch)(App));
