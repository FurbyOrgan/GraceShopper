const chai = require('chai')
const expect = chai.expect
const Order = require('./order')
const db = require('../db')

describe('Orders model', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })

    describe('attributes definition', () => {
        let order
        beforeEach(() => {
            return Order.create({
                date: 'Mon, 23 Apr 2018 06:22:35 GMT',
                status: 'processing',
                orderFirstName: 'John',
                orderLastName: 'Doe',
                orderEmail: 'johndoe@example.com', 
                shippingStreet: '405 W Superior street', 
                shippingCity: 'Chicago',
                shippingState: 'IL',
                shippingZipCode: '60654',
                billingStreet: '405 W Superior street',
                billingCity: 'Chicago',
                billingState: 'IL',
                billingZipCode: '60654'
            })
            .then(singleOrder => {
                order = singleOrder
            })
        })
        xit('has a date field', () => {
            expect(order.date).to.be.equal('Mon, 23 Apr 2018 06:22:35 GMT')//date returns as a string
        })
        it('has a status toogle field', () => {
            expect(order.status).to.be.equal('processing')
        })
        it('has a first name field', () => {
            expect(order.orderFirstName).to.be.equal('John')
        })
        it('has a last name field', () => {
            expect(order.orderLastName).to.be.equal('Doe')
        })
        it('has an email field', () => {
            expect(order.orderEmail).to.be.equal('johndoe@example.com')
        })

    })
})