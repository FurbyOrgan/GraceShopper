import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import { connect } from 'react-redux';

import { withRouter, Route, Switch, Link } from 'react-router-dom';
import AdminProductList from './admin-product'
import AddProduct from '../products/add-product'
import OrderList from '../orders/order-list'
import CategoryList from '../../components/categories/category-list'
import CategoryProductList from '../../components/categories/category-product-list'
import UserList from '../../components/users/all-users'
import EditProduct from '../../components/products/edit-product'


class AdminSidebar extends Component {
  state = { visible: true }

  

  render() {
    const { visible } = this.state
    return (
      <div>
       
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' as={Link} to={`/`}/>
              All Products
            </Menu.Item>
            <Menu.Item name='categories' as={Link} to={`/categories`}>
              <Icon name='tags' />
              Categories
            </Menu.Item>
            <Menu.Item name='add-product' as={Link} to={`/add-product`}>
              <Icon name='cart arrow down' />
              Add Product
            </Menu.Item>
            <Menu.Item name='orders' as={Link} to={`/orders`}>
              <Icon name='handshake' />
              All Orders
            </Menu.Item>
            <Menu.Item name='view-users' as={Link} to={`/users`}>
              <Icon name='users'/>
              View Users
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>

            <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/" component={AdminProductList} />
            <Route exact path="/add-product" component={AddProduct}/>
            <Route exact path="/products/:id/edit" component={EditProduct} />
            <Route exact path='/orders' component={OrderList}/>
           
            <Route exact path ='/users' component={UserList}/>
            <Route exact path="/categories/:categoryId" component={CategoryProductList} />
            <Route exact path ='/categories' component={CategoryList}/>
           
          </Switch>
           
              
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}
const mapState = ({categories}) => ({categories})

export default withRouter(connect(mapState, null)(AdminSidebar));
