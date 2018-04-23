import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    Button,
    Divider,
    Form,
    Icon,
    Input,
    Message,
    Modal,
} from 'semantic-ui-react';

import EditOrder from './edit-order'

const OrderThumb = (props) => {
    const pickColor = (props) => {
        switch (props.order.status) {
            case 'processing':
                return 'yellow'
            case 'shipped':
                return 'green'
            case 'cancelled':
                return 'red'
            default:
                return 'grey'
        }
    }

    const pickIcon = (props) => {
        switch (props.order.status) {
            case 'processing':
                return 'settings'
            case 'shipped':
                return 'check'
            case 'cancelled':
                return 'ban'
            default:
                return 'first order'
        }
    }
    const order = props.order
    return (
        <Modal trigger={
            <Message
            onClick={() => props.history.push(`/orders/${order.id}`)}
                icon={pickIcon(props)}
                header={`Order #${order.id}`}
                color={pickColor(props)}
            />
        }>
            <EditOrder order={order} />
        </Modal>
    )
}

export default withRouter(OrderThumb);
// handleChange = (event, { value }) => {
//     if (event.target.tagName === 'LABEL'){
//         this.setState({ status: event.target.value})
//     } else {
//         const name = event.target.name;
//         this.setState({ [name]: event.target.value })
//     }
// }
