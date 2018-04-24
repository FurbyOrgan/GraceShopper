import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Container,
    Header
} from 'semantic-ui-react';

import OrderThumb from './order-thumb'

const OrderList = (props) => {
    const orders = props.orders
    return (
        <Container text>
            <Header as="h2">Orders</Header>
            {orders.map(order =>
                (<OrderThumb
                    key={order.id}
                    order={order}
                />)
            )}
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    if (state.user.id && !state.user.isAdmin) {
        return {
          orders: state.orders.filter(order => order.userId === state.user.id)
        };
      }
      return { orders: state.orders };
}
export default connect(mapStateToProps, null)(OrderList);
