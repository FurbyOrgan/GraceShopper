import React, { Component } from 'react';

import {
    Icon,
    Message
} from 'semantic-ui-react';

class OrderThumb extends Component {

    pickColor() {
        switch (this.props.status) {
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
        switch (this.props.status) {
            case 'processing':
                return 'settings'
            case 'shipped':
                return 'shipping'
            case 'cancelled':
                return 'ban'
            default :
                return 'first order'
        }
    }

    render () {
        return (
            <Message
                icon={this.pickIcon()}
                header='Order Id'
                color={this.pickColor()}
            />
        )
    }
    
}

export default OrderThumb;