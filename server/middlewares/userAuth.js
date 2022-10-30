const db = require("../models");
//Assigning db.employees to Employees variable
const Employees = db.employees;

//check if username already exist in the database
const checkUsername = async (req, res, next) => {
  try {
    const existUsername = await Employees.findOne({
      where: {
        username: req.body.username,
      },
    });
    //if username exist in the database respond with a status of 409
    if (existUsername) {
      return res.json(409).send("username already taken");
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

//exporting module
module.exports = {
  checkUsername,
};
