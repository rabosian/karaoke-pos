module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("products", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categories_id: {
      type: DataTypes.INTEGER,
      references: { model: 'categories', key: 'id' },
      allowNull: false,
    }
  });

  return Products;
};
