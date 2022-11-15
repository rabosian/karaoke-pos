module.exports = (sequelize, DataTypes) => {
  const Takeouts = sequelize.define("takeouts", {
    takeoutsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    productsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employeesUsername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    }
  });

  return Takeouts;
};
