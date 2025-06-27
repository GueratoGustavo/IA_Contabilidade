import express from "express";
import classifierRoutes from "../src/routes/classifierRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use("/classify", classifierRoutes);
app.use(errorHandler);

export default app;
