import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Agente Financeiro API",
      version: "1.0.0",
      description: "Documentação da API do Agente Financeiro Contábil",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/docs/*.yaml"],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
