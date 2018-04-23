import React, { Component } from 'react';

import {
    Form,
    Icon,
    Input,
    Message,
    Modal,
} from 'semantic-ui-react';

class OrderThumb extends Component {

    pickColor() {
        switch (this.props.order.status) {
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

    pickIcon() {
        switch (this.props.order.status) {
            case 'processing':
                return 'settings'
            case 'shipped':
                return 'shipping'
            case 'cancelled':
                return 'ban'
            default:
                return 'first order'
        }
    }

    render() {
        console.log('order', this.props.order)
        const order = this.props.order
        return (
            <Modal trigger={
                <Message
                    icon={this.pickIcon()}
                    header={`Order #${order.id}`}
                    color={this.pickColor()}
                />
            }>
                <Modal.Header>{`Order #${order.id}`}</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Group widths="equal">
                            <Form.Field control={Input} label='First Name' placeholder={order.orderFirstName} />
                            <Form.Field control={Input} label='Last Name' placeholder={order.orderLastName} />
                        </Form.Group>
                        <Form.Group inline>
                        </Form.Group>
                    </Form>
                </Modal.Content>
            </Modal>

        )
    }

}

export default OrderThumb;