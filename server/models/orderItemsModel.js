module.exports = (sequelize, DataTypes) => {
  const OrderItems = sequelize.define("order_items", {
    orderItems: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    productsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  return OrderItems;
};
