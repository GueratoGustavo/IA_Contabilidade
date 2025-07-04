"use strict";

function validateHash(hash) {
  return /^[a-f0-9]{64}$/i.test(hash); // SHA-256
}

function validateMetadata(metadataJSON) {
  let metadata;
  try {
    metadata = JSON.parse(metadataJSON);
  } catch (e) {
    throw new Error("Metadata inválido: JSON malformado");
  }

  if (!metadata.filename || !metadata.uploadDate) {
    throw new Error("Metadata inválido: campos obrigatórios ausentes");
  }

  return metadata;
}

module.exports = {
  validateHash,
  validateMetadata,
};
