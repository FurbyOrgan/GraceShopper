const db = require('../db');
const Sequelize = require('sequelize');

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  status: {
    type: Sequelize.ENUM('processing', 'shipped'),
    allowNull: false
  },
  orderFirstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  orderLastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  orderEmail: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  shippingStreet: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shippingCity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shippingState: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shippingZipCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billingStreet: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billingCity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billingState: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billingZipCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = Order;
