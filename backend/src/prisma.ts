import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

const env = process.env.DATABASE_ENV || "local";

const databaseUrls: Record<string, string | undefined> = {
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

console.log(`Conectando ao banco com: ${DATABASE_URL}`);

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

export default prisma;
