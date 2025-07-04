const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const documentService = require("../services/documentService");
const logger = require("../utils/logger");
const { registrarDocumento } = require("../../blockchain/auditor/auditor"); // ajuste o caminho conforme seu projeto

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Arquivo não enviado." });
    }

    const filePath = req.file.path;
    const userId = req.user?.id;

    // Etapa 1: Classificação IA
    const classification = await documentService.classifyDocument(filePath);

    // Etapa 2: Salvar no MongoDB
    const newDocument = await documentService.saveDocument({
      userId,
      filePath,
      classification,
    });

    // Etapa 3: Calcular hash do arquivo
    const fileBuffer = fs.readFileSync(filePath);
    const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

    // Etapa 4: Criar metadata para a blockchain
    const metadata = JSON.stringify({
      userId,
      classification,
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
    });

    // Etapa 5: Registrar na blockchain
    const auditResult = await registrarDocumento(
      newDocument._id.toString(),
      hash,
      metadata
    );

    // Etapa 6: Retorno final
    res.status(200).json({
      message: "Documento classificado e auditado com sucesso!",
      document: newDocument,
      audit: auditResult,
    });
  } catch (err) {
    logger.error("Erro no upload de documento", err);
    res.status(500).json({ error: "Erro ao processar o documento." });
  }
};
