const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true }, // Ex: Nota Fiscal, Recibo...
  date: { type: Date, required: true },
  value: { type: Number, required: true },
  description: { type: String },
  category: { type: String }, // Classificação/ categoria
  cnpj: { type: String }, // CNPJ do emitente
  classification: { type: String }, // Resultado da IA
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Document", documentSchema);
