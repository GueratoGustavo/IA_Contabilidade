import { PrismaClient } from "@prisma/client";

const env = process.env.DATABASE_ENV || "local";

const databaseUrls = {
  local: process.env.DATABASE_URL_LOCAL,
  docker: process.env.DATABASE_URL_DOCKER,
  prod: process.env.DATABASE_URL_PROD,
};

const DATABASE_URL = databaseUrls[env as keyof typeof databaseUrls];

console.log(`Conectando ao banco com: ${DATABASE_URL}`);

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

export default prisma;
