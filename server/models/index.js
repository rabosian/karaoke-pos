const config = require('../config/db.config')
const Sequelize = require('sequelize')

// create Sequelize instance
const sequelize = new Sequelize(
    config.DATABASE,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
    }
)

const db = {}
db.sequelize = sequelize

db.models = {}
db.models.Employee = require('./employee')(sequelize, Sequelize.DataTypes)


module.exports = db;


