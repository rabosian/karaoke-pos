const bcrypt = require('bcrypt')
const saltRounds = 10


module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("employees", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Employee.beforeCreate(async (emp, options) => {
    console.log('>>hashing password...')
    emp.password = await bcrypt.hash(emp.password, saltRounds)

    console.log(`password hashed: ${emp.password}`)
  })

  Employee.sync({ alter: true })
    .then(() => {
      console.log(">Employee table synced");
    })
    .catch((err) => console.log("unable to sync Employee table: ", err));

  return Employee;
};
