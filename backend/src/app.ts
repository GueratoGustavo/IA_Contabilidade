import express from "express";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import bankingRouter from "./routes/banking";
import analysisRouter from "./routes/analysis";
import agentRouter from "./routes/agent";

const app = express();

app.use(express.json());

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/banking", bankingRouter);
app.use("/analysis", analysisRouter);
app.use("/agent", agentRouter);

app.get("/", (req, res) => {
  res.send("API Agente Financeiro IA rodando 🚀");
});

export default app;
