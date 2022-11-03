const db = require("../models");

// Assigning products to the variable Products
const Products = db.products;

// Add category
const products_get = async (req, res) => {
  const allProducts = await Products.findAll();
  res.json(allProducts);
  try {
  } catch (error) {
    console.log(error);
  }
};


const products_post = async (req, res) => {
  try {
    const { name, price, stock, categories_id } = req.body;
    const data = {
      name,
      price,
      stock,
      categories_id
    };
    //saving the products
    const products = await Products.create(data);
    if (products) {
      return res.status(201).send("Product created successfully!");
    } else {
      return res.status(409).send("Product created fail");
    }
  } catch (error) {
    console.log(error);
  }
};

const products_update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, categories_id } = req.body;
    await Products.update(
      { name: name,
        price: price,
        stock: stock,
        categories_id: categories_id
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.send("Products updated successfully!");
  } catch (error) {
    console.log(error);
  }
};

const products_delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Products.destroy({
      where: {
        id: id,
      },
    });
    res.send("Product deleted successfully!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  products_get,
  products_post,
  products_update,
  products_delete
};
