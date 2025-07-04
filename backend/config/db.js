const mongoose = require("mongoose");
const config = require("./config");
const logger = require("../utils/logger");

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("MongoDB conectado com sucesso");
  } catch (error) {
    logger.error("Erro ao conectar ao MongoDB", error);
    process.exit(1);
  }
};

module.exports = connectDB;
