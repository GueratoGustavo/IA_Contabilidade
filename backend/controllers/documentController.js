const { spawn } = require("child_process");
const path = require("path");
const Document = require("../models/Document");

exports.uploadDocument = async (req, res) => {
  try {
    const filePath = req.file.path;

    // Chama script Python para classificar
    const pythonProcess = spawn("python", [
      path.join(__dirname, "../python/classify.py"),
      filePath,
    ]);

    let result = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Erro no Python: ${data}`);
    });

    pythonProcess.on("close", async (code) => {
      const classification = result.trim();

      const document = new Document({
        user: req.user.id,
        type: classification || "Desconhecido", // Ex: "Nota Fiscal"
        date: new Date(), // No futuro: extraído da IA ou do OCR
        value: 0, // Mock — depois será extraído da imagem/texto
        description: "",
        category: "", // Ou derive de classification
        cnpj: "", // No futuro: OCR/regex
        classification,
      });

      await document.save();

      res.status(200).json({
        message: "Documento classificado com sucesso!",
        document,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no upload do documento." });
  }
};
