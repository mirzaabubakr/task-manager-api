import { DataTypes, Sequelize } from "sequelize";

export const TasksModel = (sequelize: Sequelize) => {
  return sequelize.define<any>(
    "Task",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      priority: {
        type: DataTypes.ENUM("Low", "Medium", "High"),
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: "due_date",
      },
      status: {
        type: DataTypes.ENUM("Pending", "Completed", "Overdue"),
        defaultValue: "Pending",
      },
    },
    {
      tableName: "tasks",
      paranoid: true,
      timestamps: true,
    }
  );
};
