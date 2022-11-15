module.exports = (sequelize, DataTypes) => {
  const Rooms = sequelize.define("rooms", {
    roomName: {
      type: DataTypes.STRING,
      primaryKey: true, 
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Rooms;
};