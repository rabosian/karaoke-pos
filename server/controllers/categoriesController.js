const db = require("../models");

// Assigning categories to the variable Categories
const Categories = db.categories;


// Add category
const categories_get = async (req, res) => {
  const allCategories = await Categories.findAll();
  res.json(allCategories);
  try {
  } catch (error) {
    console.log(error);
  }
};


const categories_post = async (req, res) => {
  try {
    const { name } = req.body;
    const data = {
      name,
    };
    //saving the categories
    const categories = await Categories.create(data);
    if (categories) {
      return res.status(201).send("Category created successfully!");
    } else {
      return res.status(409).send("Category created fail");
    }
  } catch (error) {
    console.log(error);
  }
};

const categories_update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await Categories.update(
      { name: name },
      {
        where: {
          id: id,
        },
      }
    );
    res.send("Category updated successfully!");
  } catch (error) {
    console.log(error);
  }
};

const categories_delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Categories.destroy({
      where: {
        id: id,
      },
    });
    res.send("Category deleted successfully!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  categories_post,
  categories_get,
  categories_update,
  categories_delete
};
