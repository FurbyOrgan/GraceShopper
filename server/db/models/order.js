const db = require('../db');
const Sequelize = require('sequelize');

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
});

module.exports = Order;
