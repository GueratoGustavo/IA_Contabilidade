const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const LEDGER_PATH = path.resolve(__dirname, "../ledgers");
if (!fs.existsSync(LEDGER_PATH)) fs.mkdirSync(LEDGER_PATH, { recursive: true });

function generateHash(data) {
  return crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex");
}

function saveBlockLedger(block) {
  const data = {
    index: block.index,
    timestamp: block.timestamp,
    documentId: block.documentId,
    previousHash: block.previousHash,
    hash: block.hash,
  };

  const hash = generateHash(data);
  const filename = `block-${block.index}-${hash.slice(0, 8)}.json`;
  const filepath = path.join(LEDGER_PATH, filename);

  try {
    fs.writeFileSync(
      filepath,
      JSON.stringify({ ...data, integrityHash: hash }, null, 2)
    );
    return filename;
  } catch (err) {
    console.error("Erro ao salvar o ledger do bloco:", err);
    throw err;
  }
}

module.exports = { generateHash, saveBlockLedger };
