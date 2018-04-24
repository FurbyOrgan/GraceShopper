import axios from 'axios'
import history from 'history'

/**
 * INITIAL STATE
 */
const initialLineItemsState = []

/**
 * ACTION TYPES
 */
const FETCH_ALL_LINEITEMS = 'FETCH_ALL_LINEITEMS'

const fetch = lineItems => ({
    type: FETCH_ALL_LINEITEMS,
    lineItems
})

/**
 * THUNK CREATORS
 */

export const fetchAllLineItems = () => {
    return dispatch =>
        axios
            .get('/api/lineItems')
            .then(res => dispatch(fetch(res.data)))
            .catch(err => console.log(err))
}

/**
 * REDUCER
 */
export default function reducer(lineItems = initialLineItemsState, action) {
    switch(action.type) {
        case FETCH_ALL_LINEITEMS:
            return action.lineItems
        default:
            return lineItems
    }
}