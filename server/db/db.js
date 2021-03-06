const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const graceShopper = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${graceShopper}`,
  {
    logging: false
  }
)
module.exports = db
