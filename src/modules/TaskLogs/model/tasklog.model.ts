import { DataTypes, Sequelize } from "sequelize";

export const TaskLogsModel = (sequelize: Sequelize) => {
  return sequelize.define<any>(
    "TaskLogs",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      changeType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      changeDetails: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "task_logs",
    }
  );
};
