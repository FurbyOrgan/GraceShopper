import React, { Component } from 'react';

import {
    Divider,
    Form,
    Icon,
    Input,
    Message,
    Modal,
} from 'semantic-ui-react';

class OrderThumb extends Component {
    constructor(props) {
        super(props)
        this.state = props.order
    }

    pickColor() {
        switch (this.state.status) {
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

    handleChange = (event, { value }) => {
        const name = event.target.name;
        this.setState({ [name]: event.target.value })
    }

    pickIcon() {
        switch (this.state.status) {
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

    render() {
        const order = this.state
        return (
            <Modal trigger={
                <Message
                    icon={this.pickIcon()}
                    header={`Order #${order.id}`}
                    color={this.pickColor()}
                />
            }>
                <Modal.Header>
                    {`Order #${order.id}`}
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Group inline>
                            <Form.Radio 
                                label="Processing"
                                value={order.status}
                                name="status"
                                checked={order.status === 'processing'}
                                onChange={this.handleChange}
                            />
                            <Form.Radio 
                                label="Shipped"
                                value={order.status}
                                name="status"
                                checked={order.status === 'shipped'}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Input}
                                label="First Name"
                                name="orderFirstName"
                                value={order.orderFirstName}
                                onChange={this.handleChange}
                            />
                            <Form.Field
                                control={Input}
                                label="Last Name"
                                name="orderLastName"
                                value={order.orderLastName}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Divider />
                        <h4>Billing</h4>
                        <Form.Field
                            control={Input}
                            label="Street"
                            name="billingStreet"
                            value={order.billingStreet}
                            onChange={this.handleChange}
                        />
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Input}
                                label="City"
                                name="billingCity"
                                value={order.billingCity}
                                onChange={this.handleChange}
                            />
                            <Form.Field
                                control={Input}
                                label="State"
                                name="billingState"
                                value={order.billingState}
                                onChange={this.handleChange}
                            />
                            <Form.Field
                                control={Input}
                                label="Zip"
                                name="billingZipCode"
                                value={order.billingZipCode}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Divider />
                        <h4>Shipping</h4>
                        <Form.Field
                            control={Input}
                            label="Street"
                            name="shippingStreet"
                            value={order.shippingStreet}
                            onChange={this.handleChange}
                        />
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Input}
                                label="City"
                                name="shippingCity"
                                value={order.shippingCity}
                                onChange={this.handleChange}
                            />
                            <Form.Field
                                control={Input}
                                label="State"
                                name="shippingState"
                                value={order.shippingState}
                                onChange={this.handleChange}
                            />
                            <Form.Field
                                control={Input}
                                label="Zip"
                                name="shippingZipCode"
                                value={order.shippingZipCode}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Content>
            </Modal>

        )
    }

}

export default OrderThumb;