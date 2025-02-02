import cors from "cors";
import express from "express";
const taskRoutes = require("./modules/tasks/routes");
const taskLogRoutes = require("./modules/task_logs/routes");

const app = express();

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes configuration
app.use("/api/tasks", taskRoutes);
app.use("/api/task_logs", taskLogRoutes);

module.exports = app;
