import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import logger from "../backend/src/utils/logger";
import routes from "../backend";

const app = express();

app.use(express.json());

// Logs de requisições simples
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Rotas
app.use("/api", routes);

// Middleware de erro (sempre no final)
app.use(errorHandler);

export default app;
