module.exports = (sequelize, DataTypes) => {
  const Employees = sequelize.define("employees", {
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
  return Employees;
};
