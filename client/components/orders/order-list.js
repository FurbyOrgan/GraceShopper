import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Container,
    Header,
    Dropdown
} from 'semantic-ui-react';

import OrderThumb from './order-thumb'

class OrderList extends Component {
    constructor() {
        super()
        this.state = {
            statusFilter: 'all'
        }
    }

    onFilterChanged = (event, data) => {
        this.setState({ statusFilter: data.value })
    }

    render() {
        const filters = [
            { text: 'All', value: 'all' },
            { text: 'Processing', value: 'processing' },
            { text: 'Shipped', value: 'shipped' }
        ]
        const { orders } = this.props
        return (
            <Container text>
                <Header as="h2">{orders.length} Orders</Header>
                <span>Show orders with status: <Dropdown inline options={filters} defaultValue={filters[0].value} onChange={this.onFilterChanged} /></span>
                {orders.filter(order => this.state.statusFilter === 'all' || order.status === this.state.statusFilter).map(order =>
                    (<OrderThumb
                        key={order.id}
                        order={order}
                    />)
                )}
            </Container>
        )
    }
}

const mapStateToProps = state => (
    state.user.id && !state.user.isAdmin
    ? { orders: state.orders.filter(order => order.userId === state.user.id).sort((a, b) => (a.id > b.id ? 1 : -1)) }
    : { orders: state.orders.sort((a, b) => (a.id > b.id ? 1 : -1)), products: state.products }
)

export default connect(mapStateToProps, null)(OrderList);
