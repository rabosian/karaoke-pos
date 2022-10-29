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

  Employee.sync({ alter: true })
    .then(() => {
      console.log("Employee table synced");
    })
    .catch((err) => console.log("unable to sync Employee table: ", err));

  return Employee;
};
