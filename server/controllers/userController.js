const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

// Assigning employees to the variable Employees
const Employees = db.employees;

//hashing employees password before its saved to the database with bcrypt
const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
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
        expiresIn: "24h",
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

    const employee = await Employees.findOne({
      where: {
        username,
      },
    });
    //if user is found, compare password with bcrypt
    if (employee) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        employee.password
      );
      //if password is the same
      //generate token with the user's id and the secretKey in the env file
      if (isPasswordCorrect) {
        let token = jwt.sign({ id: employee.id }, process.env.secretKey, {
          expiresIn: "24h",
        });

        // maxAge
        // 60 * 1000 = 1min
        // 60 * 60 * 1000 = 1h
        // 24 * 60 * 60 * 1000 = 24h == 1 day
        res.cookie("jwt", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        //send employees data
        res.status(200).json({ employee: employee.username });
      } else {
        res
          .status(401)
          .json({ error: "Authentication failed, password NOT match"});
      }
    } else {
      res.status(401).json({error: "Authentication failed, user NOT found"});
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
  logout,
};
