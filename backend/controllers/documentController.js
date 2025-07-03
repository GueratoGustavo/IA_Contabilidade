const path = require("path");
const documentService = require("../services/documentService");
const logger = require("../utils/logger");

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Arquivo não enviado." });
    }

    const filePath = req.file.path;
    const userId = req.user?.id;

    const classification = await documentService.classifyDocument(filePath);

    const newDocument = await documentService.saveDocument({
      userId,
      filePath,
        classification,
    });

    res.status(200).json({
      message: "Documento classificado com sucesso!",
      document: newDocument,
    });
  } catch (err) {
    logger.error("Erro no upload de documento", err);
    res.status(500).json({ error: "Erro ao processar o documento." });
  }
};
