const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize('karaoke', 'postgres', process.env.secretPassword, {
  host: 'localhost',
  dialect: 'postgres'
});

//checking if connection is done
sequelize.authenticate().then(() => {
  console.log(`Database connected to karaoke`)
}).catch((err) => {
  console.log(err)
})

// Capital Sequelize === create Sequelize DB
// Lower-case sequelize === call as an object
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

//connecting to model
db.employees = require('./userModel') (sequelize, DataTypes)

//exporting the module
module.exports = db