import express from "express";
const taskLogsController = require("./controller");
const router = express.Router();

router.get("/", taskLogsController.getTaskLogs);

module.exports = router;
