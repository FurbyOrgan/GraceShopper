import { expect, assert } from 'chai'
import { creatStore } from 'redux'
import reducer, { fetch, grab, create, update, remove, FETCH_PRODUCT_REVIEWS } from './review'

const REVIEW = { 
    subject: 'paper', 
    body: 'this is probably really good paper',
    rating: 5 
}

const REVIEWS = [
    {subject: 'paper', 
    body: 'this is probably really good paper',
    rating: 5}, 
    {subject: 'sticky notes', 
    body: 'this is probably bad',
    rating: 1}
]

describe('Review Store', () => {
    describe ('Action Creators', () => {
        describe('fetch', () => {
            it('returns properly formatted action', () => {

                const action = fetch(REVIEW)

                assert.equal(action.type, 'FETCH_PRODUCT_REVIEWS')
                assert.equal(action.reviews, REVIEW)
            })
        })
        describe('grab', () => {
            it('returns properly formatted action', () => {

                const action = grab(REVIEW)

                assert.equal(action.type, 'GRAB_USER_REVIEWS')
                assert.equal(action.reviews, REVIEW)
            })
        })
        describe('create', () => {
            it('returns properly formatted action', () => {

                const action = create(REVIEW)

                assert.equal(action.type, 'CREATE_REVIEW')
                assert.equal(action.review, REVIEW)
            })
        })
        describe('update', () => {
            it('returns properly formatted action', () => {

                const action = update(REVIEW)

                assert.equal(action.type, 'UPDATE_REVIEW')
                assert.equal(action.review, REVIEW)
            })
        })
        describe('remove', () => {
            xit('returns properly formatted action', () => {

                const action = remove(REVIEW)

                assert.equal(action.type, 'REMOVE_REVIEW')
                assert.equal(action.id, REVIEW)
            })
        })
    })
    describe('Reducers', () => {

        describe('reduces on FETCH_PRODUCT_REVIEWS action', () => {
            xit ('does something', () => {
                // const action = fetch(REVIEW)

                const nextState = reducer([], { type: 'FETCH_PRODUCT_REVIEWS', REVIEWS })
                // console.log("NEXTSTATE",nextState)
                assert.equal(nextState, REVIEWS)
            })
        })
    })
})

