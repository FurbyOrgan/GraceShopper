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
import { connect } from 'react-redux';
import {
    toggleOrderStatus,
    fetchOrderItems
} from '../../store';
import ProductListItem from '../index'

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

    componentWillMount = () => {
        this.props.onLoad();
    }

    orderTotal = (lineItems) => {
        if (!lineItems) {
            lineItems = []
            return 0.00
        } else {
            return lineItems.reduce((total, lineItem) => total += lineItem.price * lineItem.quantity, 0).toFixed(2);


            // return lineItems.reduce(lineItem => (Number(lineItem.price.slice(1, -1)) * lineItem.quantity).toFixed(2), 0)
        }
    }

    render() {
        const order = this.props.order
        const isAdmin = this.props.user.isAdmin;
        const lineItems = this.props.lineItems
        return (
            <Modal.Content>
                <Modal.Header as="h2">
                    {`Order #${order.id}`}
                </Modal.Header>
                <Modal.Content>
                    <h4>Items</h4>
                    <ul>
                        {lineItems
                            ? lineItems.map(lineItem => <li key={lineItem.id}>{lineItem.product.title} (${lineItem.price}) x{lineItem.quantity}</li>)
                            : <li>This order doesn't have any items!</li>
                        }
                    </ul>
                    <h4>Total = ${this.orderTotal(lineItems)}</h4>
                    <Form>
                        <Form.Group>
                            <Button icon labelPosition="left" color={this.pickColor()} disabled={!isAdmin} onClick={() => this.props.onToggleStatusClicked(order)}>
                                <Icon name={this.pickIcon()} />
                                {order.status}
                            </Button>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Input}
                                label="First Name"
                                name="orderFirstName"
                                value={order.orderFirstName}
                                onChange={this.handleChange}
                                readOnly
                            />
                            <Form.Field
                                control={Input}
                                label="Last Name"
                                name="orderLastName"
                                value={order.orderLastName}
                                onChange={this.handleChange}
                                readOnly
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
                            readOnly
                        />
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Input}
                                label="City"
                                name="billingCity"
                                value={order.billingCity}
                                onChange={this.handleChange}
                                readOnly
                            />
                            <Form.Field
                                control={Input}
                                label="State"
                                name="billingState"
                                value={order.billingState}
                                onChange={this.handleChange}
                                readOnly
                            />
                            <Form.Field
                                control={Input}
                                label="Zip"
                                name="billingZipCode"
                                value={order.billingZipCode}
                                onChange={this.handleChange}
                                readOnly
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
                            readOnly
                        />
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Input}
                                label="City"
                                name="shippingCity"
                                value={order.shippingCity}
                                onChange={this.handleChange}
                                readOnly
                            />
                            <Form.Field
                                control={Input}
                                label="State"
                                name="shippingState"
                                value={order.shippingState}
                                onChange={this.handleChange}
                                readOnly
                            />
                            <Form.Field
                                control={Input}
                                label="Zip"
                                name="shippingZipCode"
                                value={order.shippingZipCode}
                                onChange={this.handleChange}
                                readOnly
                            />
                        </Form.Group>
                    </Form>
                </Modal.Content>
            </Modal.Content>
        )
    }
}

const mapState = ({ user, products }, ownProps) => {
    const result = {
        user,
    }
    if (ownProps.order.lineItems) {
        const ordersLineItems = ownProps.order.lineItems.map(item => {
            const productWeWant = products.filter(product => product.id === item.productId)[0]
            return { ...item, product: productWeWant }
        })
        result.lineItems = ordersLineItems
    }
    return result
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        onToggleStatusClicked: (order) => dispatch(toggleOrderStatus(order)),
        onLoad: () => dispatch(fetchOrderItems(ownProps.order))
    }
}

export default connect(mapState, mapDispatch)(withRouter(EditOrder))
