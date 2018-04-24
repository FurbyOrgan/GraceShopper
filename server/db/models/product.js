const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define(
  'product',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
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
      defaultValue: 0
    },
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: '/img/placeholder-image.png'
    },
    averageRating: {
      type: Sequelize.DECIMAL,
      defaultValue: 0
    },
    reviewCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  },
  {
    scopes: {
      withCategories: () => ({
        include: [
          {
            attributes: ['id'],
            model: db.model('category'),
            through: { attributes: [] },
            as: 'categories'
          }
        ]
      })
    }
  }
);

module.exports = Product;
