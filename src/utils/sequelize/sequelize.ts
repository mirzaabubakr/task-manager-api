import dbConfig from "../../config/postgre.config";
import { TaskLogsModel } from "../../modules/task_logs/model/tasklog.model";
const { Sequelize } = require("sequelize");
import { TasksModel } from "../../modules/tasks/model/tasks.model";
const env: string = process.env.NODE_ENV || "development";
const config = dbConfig[env] || dbConfig.development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

sequelize
  .sync()
  .then((): void => {
    console.log(" Database connected successfully.");
  })
  .catch((err: Error): void => {
    console.error("Error connecting to the database:", err);
  });

const Task = TasksModel(sequelize);
const TaskLogs = TaskLogsModel(sequelize);

TaskLogs.belongsTo(Task, { foreignKey: "taskId", as: "task" });
Task.hasMany(TaskLogs, { foreignKey: "taskId", as: "logs" });

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error initializing the database:", error);
  }
}

// Initialize the database
initializeDatabase();

export { sequelize, Task, TaskLogs };
