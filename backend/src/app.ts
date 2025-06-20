import express from "express";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth"; // ✅ Adiciona isso

const app = express();

app.use(express.json());

app.use("/users", usersRouter);
app.use("/auth", authRouter); // ✅ Adiciona isso

export default app;
