module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("orders", {
    roomName: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    employeeUsername: {
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
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isKorean: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    customerNum: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    }
  });

  return Orders;
};
