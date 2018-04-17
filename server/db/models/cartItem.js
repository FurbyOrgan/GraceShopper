const Sequelize = require('sequelize')
const db = require('../db')


const CartItem = db.define('cartItem', {
    quantity:{
        type: Sequelize.INTEGER
    }

// Write class methods to validate minimum should be at least 1 and maximum should not exceed inventory amount. Instance method??
})

module.exports = CartItem