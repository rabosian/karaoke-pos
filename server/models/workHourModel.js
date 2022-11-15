module.exports = (sequelize, DataTypes) => {
  const WorkHours = sequelize.define("work_hours", {
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
