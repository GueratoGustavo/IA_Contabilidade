const multer = require("multer");
const path = require("path");

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Filtro para aceitar apenas certos tipos de arquivos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo inválido"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
    