const db = require("../models");

const workHour = db.workHour

const workHour_get = async (req, res) => {
  try {
    const workHour = await workHour.findAll();
    res.json(workHour);
  } catch (error) {
    console.log(error);
  }
};

const workHour_post = async (req, res) => {
  try {
    const { employeeUsername, startTime, endTime } = req.body;
    const data = {
        employeeUsername, startTime, endTime
    }
    const workHour = await workHour.create(data);

    if (workHour) {
      return res.status(201).json(workHour);
    } else {
      return res.status(409).json({ message: "workHour POST failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

const workHour_update = async (req, res) => {
  try {
    const { id } = req.params; // id 
    const { employeeUsername, startTime, endTime } = req.body; // input
    await workHour.update(
      { employeeUsername, startTime, endTime },
      {
        where: { id },
      }
    );
    res.send("workHour update success");
  } catch (error) {
    console.log(error);
  }
};

const workHour_delete = async (req, res) => {
  try {
    const { id } = req.params;
    await workHour.destroy({
      where: {
        id
      },
    });
    res.send("workHour deleted successfully!");
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  workHour_post,
  workHour_get,
  workHour_update,
  workHour_delete,
};
