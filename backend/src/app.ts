import express from "express";
import classifierRoutes from "../src/routes/classifierRoutes";
import { errorHandler } from "../src/middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use("/classify", classifierRoutes);
app.use(errorHandler);

export default app;
