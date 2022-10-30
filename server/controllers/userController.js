const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

// Assigning employees to the variable Employees
const Employees = db.employees;

//hashing employees password before its saved to the database with bcrypt
const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = {
      username,
      password: await bcrypt.hash(password, 10),
    };
    //saving the employees
    const employees = await Employees.create(data);

    //generate token with the employees's id and the secretKey in the env file
    //set cookie with the token generated
    if (employees) {
      let token = jwt.sign({ id: employees.id }, process.env.secretKey, {
        expiresIn: '24h',
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      //send users details
      return res.status(201).send(employees);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

//login authentication

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //find a username
    const employees = await Employees.findOne({ username });

    //if user is found, compare password with bcrypt
    if (employees) {
      const isPasswordCorrect = await bcrypt.compare(password, employees.password);

      //if password is the same
      //generate token with the user's id and the secretKey in the env file
      if (isPasswordCorrect) {
        let token = jwt.sign({ id: employees.id }, process.env.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        //if password matches wit the one in the database
        //go ahead and generate a cookie for the user
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        //send employees data
        return res.status(201).send(employees);
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
};
