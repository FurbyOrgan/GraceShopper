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
            <Header as='h2'>Orders</Header>
            {orders.map(order =>
                <OrderThumb
                    key={order.id}
                />
            )}
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { orders: state.orders }
}
export default connect(mapStateToProps, null)(OrderList);