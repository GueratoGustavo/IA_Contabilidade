const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
  index: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
  hash: { type: String, required: true },
  previousHash: { type: String, required: true },
});

module.exports = mongoose.model("Block", blockSchema);
