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

class EditOrder extends Component {

    constructor() {
        super()
    }

    pickColor = () => {
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
    
    pickIcon = () => {
        switch (this.props.order.status) {
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
        this.props.match.history.push(`/${this.props.id}`)
        console.log(this.props)
        const order = this.props.order
        return (
            <div>
                <Modal.Header>
                    {`Order #${order.id}`}
                    <Button icon labelPosition="left" floated="right" color={this.pickColor()} onClick={this.handleChange}>
                        <Icon name={this.pickIcon()} />
                        {order.status}
                    </Button>
                </Modal.Header>
                <Modal.Content>
                    <Form>
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
            </div>
        )
    }
}

export default withRouter(EditOrder)