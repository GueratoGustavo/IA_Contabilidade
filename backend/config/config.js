require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoURI:
    process.env.MONGO_URI || "mongodb://localhost:27017/ia_contabilidade",
  jwtSecret: process.env.JWT_SECRET || "defaultsecret",
};
