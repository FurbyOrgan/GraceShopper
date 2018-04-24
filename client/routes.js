import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AssignCategories,
  CartList,
  CategoryList,
  CategoryProductList,
  CheckoutForm,
  Login,
  OrderList,
  ProductList,
  Signup,
  SingleProduct,
  SearchResults,
  UserList,
  UserHome,
  UserReviews
} from './components';

import EditProduct   from './components/products/edit-product'
import ReviewForm    from './components/reviews/review-form'
import AddProduct   from './components/products/add-product'
import AdminProductList from './components/admin/admin-product'
import AdminSidebar from './components/admin/admin-sidebar'

import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
     
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/cart"                   component={CartList} />
   
   
        <Route exact path="/checkout"               component={CheckoutForm} />
        <Route exact path="/orders"                 component={OrderList} />
        <Route exact path="/products"               component={ProductList} />
        <Route exact path="/products/:productId"    component={SingleProduct} />
        <Route path="/search/:searchQuery"          component={SearchResults} />
        <Route exact path="/login"                  component={Login} />
        <Route exact path="/signup"                 component={Signup} />
        
        {isLoggedIn && (
          <div>
         
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/user/:id/reviews" component={UserReviews} />
            <Route path="/user/:id/assignCategories" component={AssignCategories} />
            <Route exact path="/users" component={UserList} />
            <Route exact path="/review" component={ReviewForm} />

          
          
            <Route exact path="/user/:id/admin" component={AdminSidebar}/>
            

          </Switch>
          
          </div>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>

     
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
    
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
