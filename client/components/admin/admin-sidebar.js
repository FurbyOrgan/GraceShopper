import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import AdminProductList from './admin-product'
import AddProduct from '../products/add-product'

class AdminSidebar extends Component {
  state = { visible: true }

  

  render() {
    const { visible } = this.state
    return (
      <div>
       
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' as={Link} to={`/user/:id/admin`}/>
              Home
            </Menu.Item>
            <Menu.Item name='categories' as={Link} to={`/categories`}>
              <Icon name='tags' />
              Add Categories
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
              <AdminProductList/>
           
              
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default AdminSidebar
