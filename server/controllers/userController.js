const db = require("../models");
const bcrypt = require("bcrypt");
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

    if (employees) {
      return res.status(201).send("User created successfully!");
    } else {
      return res.status(409).send("Signup failed");
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
          expiresIn: '24h',
        });

        //if password matches wit the one in the database
        //go ahead and generate a cookie for the user
        res.cookie("employee access jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        //send employees data
        return res.status(201).send("Login success!");
      } else {
        return res.status(401).send("Password is wrong");
      }
    } else {
      return res.status(401).send("username cannot find");
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {
  // delete jwt from cookie
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = {
  signup,
  login,
  logout
};
