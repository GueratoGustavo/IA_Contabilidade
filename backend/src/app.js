const express = require("express");
const cors = require("cors");
const routes = require("../routes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("API rodando!");
});

module.exports = app;
