module.exports = (sequelize, DataTypes) => {
  const WorkHours = sequelize.define("workHours", {
    startTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    endTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  });

  return WorkHours;
};
