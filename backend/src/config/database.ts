import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente
dotenv.config();

// 🔥 Define a URL do banco de dados dinamicamente
const dbEnv = process.env.DATABASE_ENV;

const databaseUrl =
  dbEnv === "local"
    ? process.env.DATABASE_URL_LOCAL
    : dbEnv === "docker"
    ? process.env.DATABASE_URL_DOCKER
    : dbEnv === "prod"
    ? process.env.DATABASE_URL_PROD
    : process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL não definida. Verifique seu .env");
}

process.env.DATABASE_URL = databaseUrl;

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export default prisma;
