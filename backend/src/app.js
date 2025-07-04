const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const logger = require("./utils/logger");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("combined", { stream: logger.stream }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
