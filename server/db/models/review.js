const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('reviews', {
  body: {
    type: Sequelize.TEXT
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 5,
      min: 1
    }
  }
});

module.exports = Review;
