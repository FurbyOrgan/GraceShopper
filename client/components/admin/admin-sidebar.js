import React, { Component } from 'react'
import { connect }          from 'react-redux'

import {
  Sidebar,
  Segment,
  Menu
} from 'semantic-ui-react'

import {
  withRouter,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import AdminProductList    from './admin-product'
import AddProduct          from '../products/add-product'
import OrderList           from '../orders/order-list'
import CategoryList        from '../../components/categories/category-list'
import CategoryProductList from '../../components/categories/category-product-list'
import UserList            from '../../components/users/user-list'
import EditProduct         from '../../components/products/edit-product'
import ProductList         from '../../components/products/product-list'
import SingleProduct       from '../../components/products/single-product'
import AddCategory         from '../../components/categories/add-categories'
import CartList            from '../../components/cart/cart-list'
import CheckoutForm        from '../../components/checkout/checkout-form'
import ReviewForm          from '../../components/reviews/review-form'
import SearchResults       from '../../components/common/search-results'


class AdminSidebar extends Component {
  state = { visible: true }

  render() {
    const { visible } = this.state
    return (
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="push"
            width="thin"
            visible={visible}
            icon="labeled"
            vertical inverted
          >
            <Menu.Item
              icon="home"
              name="home"
              as={Link}
              to={`/`}>All Products</Menu.Item>
            <Menu.Item
              icon="tags"
              name="categories"
              as={Link}
              to={`/add-category`}>Add Categories</Menu.Item>
            <Menu.Item
              icon="cart arrow down"
              name="add-product"
              as={Link}
              to={`/add-product`}>Add Product</Menu.Item>
            <Menu.Item
              icon="handshake"
              name="orders"
              as={Link}
              to={`/orders`}>All Orders</Menu.Item>
            <Menu.Item
            icon="users"
            name="view-users"
            as={Link}
            to={`/users`}>View Users</Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Switch>
                <Route exact path="/"                       component={AdminProductList}    />
                <Route exact path="/add-product"            component={AddProduct}          />
                <Route exact path="/products/:id/edit"      component={EditProduct}         />
                <Route exact path="/products/:productId"    component={SingleProduct}       />
                <Route       path="/orders"                 component={OrderList}           />
                <Route exact path="/products"               component={ProductList}         />
                <Route exact path ="/users"                 component={UserList}            />
                <Route exact path="/categories/:categoryId" component={CategoryProductList} />
                <Route exact path ="/categories"            component={CategoryList}        />
                <Route exact path="/add-category"           component={AddCategory}         />
                <Route exact path="/cart"                   component={CartList}            />
                <Route exact path="/checkout"               component={CheckoutForm}        />
                <Route exact path="/products/:id/reviews"   component={ReviewForm}          />
                <Route path="/search/:searchQuery"          component={SearchResults}       />
              </Switch>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
    )
  }
}

const mapState = ({categories}) => ({categories})

export default withRouter(connect(mapState, null)(AdminSidebar))
