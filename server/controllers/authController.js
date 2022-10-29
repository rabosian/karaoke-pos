const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  models: { Employee },
} = require("../models");

// 1 day
const maxAge = 1 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

module.exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    // const employee = { id, username, password }
    const employee = await Employee.create({ username, password });
    const token = createToken(employee.id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const employee = await Employee.findOne({ where: { username: username } });
    // console.log(employee)
    if (employee) {
      const pwMatch = await bcrypt.compare(password,employee.password);
      console.log(pwMatch)

      if (pwMatch) {
        const token = createToken(employee.id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json(employee);
        return employee;
      } throw Error('password NOT match')
    } throw Error('user NOT found')
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.logout = (req, res) => {
  // delete jwt from cookie
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
