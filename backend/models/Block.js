const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema(
  {
    index: { type: Number, required: true, unique: true },
    timestamp: { type: Date, default: Date.now },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    hash: { type: String, required: true },
    previousHash: { type: String, required: true },
  },
  { timestamps: true }
);

blockSchema.index({ index: 1 });

module.exports = mongoose.model("Block", blockSchema);
