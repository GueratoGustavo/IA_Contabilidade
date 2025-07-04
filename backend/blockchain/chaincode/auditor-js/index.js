"use strict";

const { Contract } = require("fabric-contract-api");

class AuditorContract extends Contract {
  async initLedger(ctx) {
    console.log("Ledger iniciado");
  }

  async registrarDocumento(ctx, docId, hash, metadata) {
    const exists = await ctx.stub.getState(docId);
    if (exists && exists.length > 0) {
      throw new Error(`Documento ${docId} já registrado.`);
    }

    const doc = {
      docId,
      hash,
      metadata,
      timestamp: new Date().toISOString(),
    };

    await ctx.stub.putState(docId, Buffer.from(JSON.stringify(doc)));
    return JSON.stringify(doc);
  }

  async verificarDocumento(ctx, docId) {
    const buffer = await ctx.stub.getState(docId);
    if (!buffer || buffer.length === 0) {
      throw new Error(`Documento ${docId} não encontrado`);
    }
    return buffer.toString();
  }
}

module.exports = AuditorContract;
