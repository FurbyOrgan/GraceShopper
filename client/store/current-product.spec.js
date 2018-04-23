import { expect } from 'chai'
import { creatStore } from 'redux'
import { getProduct, getCurrentProduct, product, reducer } from './current-product'


describe('Current Product Store', () => {
    describe ('Action Creators', () => {
    it('returns properly formatted action', () => {
        expect(getProduct(product)).to.deep.equal({
            type: 'GET_PRODUCT',
            product
        })
    })
})
})

// describe('Reducer', () => {
//     let store;
//     beforeEach('Create the store', () => {
//         store = createStore(reducer)
//     })

//     it('returns the initial state by default', () => {
//         expect()
//     })

// })