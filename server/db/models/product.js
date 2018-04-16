const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/img/placeholder-image.png'
  }
})

module.exports = Product;
