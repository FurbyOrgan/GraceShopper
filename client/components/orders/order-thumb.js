import PropTypes          from 'prop-types'
import React              from 'react';
import { withRouter }     from 'react-router-dom';
import { Message, Modal } from 'semantic-ui-react';

import EditOrder from './edit-order'

const pickColor = ({ status }) => {
    switch (status) {
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

const pickIcon = ({ status }) => {
    switch (status) {
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

const OrderThumb = ({ order }) => (
    <Modal trigger={
        <Message
            onClick={() => order.history.push(`/orders/${order.id}`)}
            icon={pickIcon(order)}
            header={`Order #${order.id}`}
            color={pickColor(order)}
        />
    }>
        <EditOrder order={order} />
    </Modal>
)

OrderThumb.PropTypes = {
    order: PropTypes.object
}

export default withRouter(OrderThumb)
