const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define(
  'reviews',
  {
    subject: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    body: {
      type: Sequelize.TEXT,
      validate: { len: { msg: 'Review body must be at least 10 characters long.', min: 10 } }
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        max: 5,
        min: 1
      }
    }
  },
  {
    hooks: {
      afterCreate: async review => {
        const allReviewsForProduct = await Review.findAll({ where: { productId: review.productId } });
        const sumOfScores = allReviewsForProduct.reduce((total, review) => (total += review.rating), 0);
        const average = sumOfScores / allReviewsForProduct.length;
        // console.log(`Calculating average: ${average} (${sumOfScores} / ${allReviewsForProduct.length})`);
        db
          .model('product')
          .update(
            { averageRating: average, reviewCount: allReviewsForProduct.length },
            { where: { id: review.productId } }
          );
      }
    }
  }
);

Review.hook('afterUpsert');

module.exports = Review;
