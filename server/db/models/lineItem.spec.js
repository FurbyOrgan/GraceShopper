const Promise = require('bluebird')
const chai = require('chai')
const expect = chai.expect
const LineItem = require('./lineItem')
const db = require('../index')


describe('LineItem model', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })
    describe('lineItem', () => {
        let lineItem
        beforeEach(() => {
            return LineItem.create({
                quantity: 23,
                price: 53.02
            })
            .then(line => {
                lineItem = line
            })
        })
        it('creates the lineItems in the database', () => {
            expect (lineItem.quantity).to.be.equal(23)
            //price is coming back as a string
            expect (+lineItem.price).to.be.equal(53.02)
        })
    })
})