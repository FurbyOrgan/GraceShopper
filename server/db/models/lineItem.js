const Sequelize = require('sequelize');
const db = require('../db');

const LineItem = db.define('lineItem', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: {
            min: 0.01
        }
    }
})

module.exports = LineItem;
