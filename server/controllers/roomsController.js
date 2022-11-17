const db = require("../models");

const Rooms = db.rooms

const rooms_get = async (req, res) => {
  try {
    const rooms = await Rooms.findAll();
    res.json(rooms);
  } catch (error) {
    console.log(error);
  }
};

const rooms_post = async (req, res) => {
  try {
    const { roomName, capacity } = req.body;
    const data = {
      roomName, capacity
    };
    const room = await Rooms.create(data);

    if (room) {
      return res.status(201).json(room);
    } else {
      return res.status(409).json({ message: "Room POST failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

const rooms_update = async (req, res) => {
  try {
    const { id } = req.params; // id 
    const { roomName, capacity } = req.body; // input
    await Rooms.update(
      { roomName, capacity },
      {
        where: { id },
      }
    );
    res.send("room update success");
  } catch (error) {
    console.log(error);
  }
};

const rooms_delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Rooms.destroy({
      where: {
        id
      },
    });
    res.send("room deleted successfully!");
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  rooms_post,
  rooms_get,
  rooms_update,
  rooms_delete,
};
