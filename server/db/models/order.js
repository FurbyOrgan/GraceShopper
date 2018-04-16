const db = require('../db');
const Sequelize = require('sequelize');

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

module.exports = Order;
