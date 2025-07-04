const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const { spawn } = require("child_process");
const Document = require("../models/Document");
const logger = require("../utils/logger");
const { Gateway, Wallets } = require("fabric-network");

class DocumentService {
  constructor() {
    this.contract = null;
  }

  async connectToBlockchain() {
    // Configuração do gateway do Hyperledger Fabric (usar suas credenciais)
    const ccpPath = path.resolve(__dirname, "../network/connection-org1.json");
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("mychannel");
    this.contract = network.getContract("auditor");
  }

  async classifyDocument(filePath) {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(filePath)) {
        logger.error(`Arquivo não encontrado: ${filePath}`);
        return reject(new Error("Arquivo não encontrado"));
      }

      const pythonPath = path.join(__dirname, "../python/classify.py");
      const filename = path.basename(filePath);
      const python = spawn("python", [pythonPath, filePath]);

      let result = "";
      let error = "";

      python.stdout.on("data", (data) => {
        result += data.toString();
      });

      python.stderr.on("data", (data) => {
        error += data.toString();
      });

      python.on("error", (err) => {
        logger.error(`Erro ao iniciar Python para ${filename}: ${err.message}`);
        return reject(new Error(`Erro ao iniciar Python: ${err.message}`));
      });

      setTimeout(() => {
        python.kill();
        logger.error(`Timeout na classificação de ${filename}`);
        reject(new Error("Timeout na classificação"));
      }, 30000); // 30 segundos de timeout

      python.on("close", (code) => {
        if (code !== 0) {
          logger.error(`Erro ao classificar ${filename}: ${error}`);
          return reject(new Error("Erro na classificação com IA"));
        }
        logger.info(
          `Classificação concluída para ${filename}: ${result.trim()}`
        );
        resolve(result.trim());
      });
    });
  }

  calculateHash(filePath) {
    if (!fs.existsSync(filePath)) {
      throw new Error("Arquivo não encontrado para cálculo de hash");
    }
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash("sha256").update(fileBuffer).digest("hex");
  }

  async auditDocument(documentData) {
    if (!this.contract) await this.connectToBlockchain();

    try {
      const result = await this.contract.submitTransaction(
        "registrarDocumento",
        documentData.id,
        documentData.hash,
        JSON.stringify(documentData.classification)
      );
      logger.info(`Documento auditado no blockchain: ${result.toString()}`);
      return JSON.parse(result.toString());
    } catch (error) {
      logger.error(`Erro ao auditar documento: ${error.message}`);
      throw error;
    }
  }

  async saveDocument({ userId, filePath, classification }) {
    if (!userId || !filePath || !classification) {
      logger.error("Dados inválidos para salvar documento");
      throw new Error(
        "Dados inválidos: userId, filePath e classification são obrigatórios"
      );
    }

    const hash = this.calculateHash(filePath);
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
    await this.auditDocument({ id: document._id, hash, classification });
    logger.info(`Documento salvo e auditado: ${filename}`);
    return document;
  }
}

module.exports = new DocumentService();
