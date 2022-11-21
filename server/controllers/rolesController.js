const db = require("../models");

const Roles = db.roles

const Roles_get = async (req, res) => {
  try {
    const Roles = await Roles.findAll();
    res.json(Roles);
  } catch (error) {
    console.log(error);
  }
};

const Roles_post = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await Roles.create(name);

    if (role) {
      return res.status(201).json(role);
    } else {
      return res.status(409).json({ message: "role POST failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

const Roles_update = async (req, res) => {
  try {
    const { id } = req.params; // id 
    const { name } = req.body; // input
    await Roles.update(
      { name },
      {
        where: { id },
      }
    );
    res.send("role update success");
  } catch (error) {
    console.log(error);
  }
};

const Roles_delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Roles.destroy({
      where: {
        id
      },
    });
    res.send("role deleted successfully!");
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  Roles_post,
  Roles_get,
  Roles_update,
  Roles_delete,
};
