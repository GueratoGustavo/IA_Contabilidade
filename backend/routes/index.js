// backend/index.js

require("dotenv").config(); // Carrega variáveis de ambiente

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const routes = require("./routes"); // Centraliza todas as rotas
const logger = require("./utils/logger");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

// 🛡️ Segurança
app.use(helmet());
app.use(cors());

// 📝 Log de requisições
app.use(morgan("combined", { stream: logger.stream }));

// 🚫 Limite de requisições
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// 🔄 Parser JSON
app.use(express.json());

// 🚀 Rotas da API
app.use("/api", routes);

// ❌ 404 e erros
app.use(notFound);
app.use(errorHandler);

// 🔌 MongoDB
const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/ia_contabilidade";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("🟢 MongoDB conectado com sucesso");
    app.listen(PORT, () => {
      logger.info(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("🔴 Erro ao conectar no MongoDB", err);
    process.exit(1);
  });
