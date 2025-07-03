const crypto = require("crypto");
const Block = require("../models/Block");
const { saveBlockLedger } = require("./ledgerService");

function calculateHash(index, timestamp, documentId, previousHash) {
  const data = `${index}${timestamp}${documentId}${previousHash}`;
  return crypto.createHash("sha256").update(data).digest("hex");
}

async function getLatestBlock() {
  try {
    return await Block.findOne().sort({ index: -1 });
  } catch (err) {
    console.error("Erro ao buscar o último bloco:", err);
    throw err;
  }
}

async function addBlock(documentId) {
  try {
    const previousBlock = await getLatestBlock();
    const index = previousBlock ? previousBlock.index + 1 : 0;
    const timestamp = new Date();
    const previousHash = previousBlock ? previousBlock.hash : "0";

    const hash = calculateHash(
      index,
      timestamp.toISOString(),
      documentId.toString(),
      previousHash
    );

    const newBlock = new Block({
      index,
      timestamp,
      documentId,
      hash,
      previousHash,
    });

    await newBlock.save();
    saveBlockLedger(newBlock);
    return newBlock;
  } catch (err) {
    console.error("Erro ao adicionar bloco:", err);
    throw err;
  }
}

async function verifyIntegrity() {
  try {
    const blocks = await Block.find().sort({ index: 1 });

    for (let i = 1; i < blocks.length; i++) {
      const current = blocks[i];
      const previous = blocks[i - 1];

      const expectedHash = calculateHash(
        current.index,
        current.timestamp.toISOString(),
        current.documentId.toString(),
        current.previousHash
      );

      if (
        current.previousHash !== previous.hash ||
        current.hash !== expectedHash
      ) {
        return {
          valid: false,
          brokenBlock: current.index,
          message: `Corrupção detectada no bloco ${current.index}`,
        };
      }
    }

    return { valid: true, message: "✅ Blockchain íntegra" };
  } catch (err) {
    console.error("Erro na verificação de integridade:", err);
    throw err;
  }
}

module.exports = { addBlock, verifyIntegrity, calculateHash, getLatestBlock };
