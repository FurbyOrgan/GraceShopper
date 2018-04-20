const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('reviews', {
  subject: {
    type: Sequelize.TEXT,
    allowNull:false
  },
  body: {
    type: Sequelize.TEXT,
    validate: { len: { msg: 'Review body must be at least 10 characters long.', min: 10}}
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
