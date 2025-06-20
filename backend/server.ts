import { app } from "../backend/src/app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.error("❌ Unhandled Rejection:", reason);
  server.close(() => {
    process.exit(1);
  });
});
