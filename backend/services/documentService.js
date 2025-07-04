const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const { spawn } = require("child_process");
const Document = require("../models/Document");
const logger = require("../utils/logger");

async function classifyDocument(filePath) {
  return new Promise((resolve, reject) => {
    const pythonPath = path.join(__dirname, "../python/classify.py");
    const python = spawn("python", [pythonPath, filePath]);

    let result = "";
    let error = "";

    python.stdout.on("data", (data) => {
      result += data.toString();
    });

    python.stderr.on("data", (data) => {
      error += data.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {
        logger.error("Erro ao classificar documento:", error);
        return reject(new Error("Erro na classificação com IA"));
      }
      logger.info("Classificação concluída:", result.trim());
      resolve(result.trim());
    });
  });
}

function calculateHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(fileBuffer).digest("hex");
}

async function saveDocument({ userId, filePath, classification }) {
  const hash = calculateHash(filePath);
  const filename = path.basename(filePath);

  const document = new Document({
    userId,
    filename,
    path: filePath,
    hash,
    classification,
    uploadedAt: new Date(),
  });

  await document.save();
  return document;
}

module.exports = {
  classifyDocument,
  saveDocument,
  calculateHash,
};
