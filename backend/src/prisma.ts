import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

type Env = "local" | "docker" | "prod";
const env = (process.env.DATABASE_ENV as Env) || "local";

const databaseUrls: Record<Env, string | undefined> = {
  local: process.env.DATABASE_URL_LOCAL,
  docker: process.env.DATABASE_URL_DOCKER,
  prod: process.env.DATABASE_URL_PROD,
};

const DATABASE_URL = databaseUrls[env];
if (!DATABASE_URL) {
  throw new Error(
    `DATABASE_URL não configurada para o ambiente '${env}'. Verifique seu arquivo .env`
  );
}

if (process.env.NODE_ENV !== "production") {
  console.debug("[Prisma] Ambiente de DB:", { env, DATABASE_URL });
} else {
  console.info(`[Prisma] Conectando ao banco no ambiente '${env}'`);
}

const prisma = new PrismaClient({
  datasources: { db: { url: DATABASE_URL } },
  log: [
    { level: "info", emit: "stdout" },
    { level: "query", emit: "stdout" },
    { level: "warn", emit: "stdout" },
    { level: "error", emit: "stdout" },
  ],
});

export default prisma;
