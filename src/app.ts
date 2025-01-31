import cors from "cors";
import express from "express";
import { sequelize } from "./utils/sequelize/sequelize";

// const userRoutes = require("./modules/auth/routes");
// const kycRoutes = require("./modules/kyc/routes");

const app = express();

app.get("/", async (req, res) => {
  try {
    const result = await sequelize.query("SELECT NOW()");
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.use("/api/auth", userRoutes);
// app.use("/api", kycRoutes);

module.exports = app;
