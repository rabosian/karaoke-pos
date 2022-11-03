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
db.categories = require('./categoriesModel') (sequelize, DataTypes)
db.products = require('./productsModel') (sequelize, DataTypes)

// categories : products -> 1:N
db.categories.hasMany(db.products, {
  foreignKey: "categories_id",
});
db.products.belongsTo(db.categories, {
  foreignKey: "id",
});


//exporting the module
module.exports = db