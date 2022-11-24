const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize('karaoke', 'jaeyeon', process.env.secretPassword, {
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
db.orderItems = require('./orderItemsModel') (sequelize, DataTypes)
db.orders = require('./ordersModel') (sequelize, DataTypes)
db.role = require('./roleModel') (sequelize, DataTypes)
db.rooms = require('./roomsModel') (sequelize, DataTypes)
db.takeout = require('./takeoutModel') (sequelize, DataTypes)
db.workHour = require('./workHourModel') (sequelize, DataTypes)

// categories : products -> 1:N
db.categories.hasMany(db.products, { as: "products" });
db.products.belongsTo(db.categories, {
  foreignKey: "categoryId",
  as: "category"
});

// products => orderItems <= orders -> N : M
db.products.belongsToMany(db.orders, {
  through: "orderItems",
  as: "orders",
  foreignKey: "productsId",
});

db.orders.belongsToMany(db.products, {
  through: "orderItems",
  as: "products",
  foreignKey: "roomName",
});


//exporting the module
module.exports = db