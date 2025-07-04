"use strict";

const { Contract } = require("fabric-contract-api");

class AuditorContract extends Contract {
  async initLedger(ctx) {
    console.log("Ledger iniciado");
  }

  async registrarDocumento(ctx, docId, hash, metadata) {
    if (!docId || !hash || !metadata) {
      throw new Error("docId, hash e metadata são obrigatórios.");
    }

    const exists = await ctx.stub.getState(docId);
    if (exists && exists.length > 0) {
      throw new Error(`Documento ${docId} já registrado.`);
    }

    const txTimestamp = ctx.stub.getTxTimestamp();
    const timestamp = new Date(
      txTimestamp.seconds.low * 1000 + txTimestamp.nanos / 1000000
    ).toISOString();

    const doc = {
      docId,
      hash,
      metadata,
      timestamp,
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

  async verificarIntegridade(ctx, docId, hashAtual) {
    const buffer = await ctx.stub.getState(docId);
    if (!buffer || buffer.length === 0) {
      throw new Error(`Documento ${docId} não encontrado`);
    }

    const registro = JSON.parse(buffer.toString());

    if (registro.hash !== hashAtual) {
      throw new Error(
        `Hash divergente: original ${registro.hash} vs atual ${hashAtual}`
      );
    }

    return JSON.stringify({
      status: "válido",
      docId,
      hash: registro.hash,
      metadata: registro.metadata,
      timestamp: registro.timestamp,
    });
  }
}

module.exports = AuditorContract;
