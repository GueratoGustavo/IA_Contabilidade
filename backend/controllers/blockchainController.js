const { verifyIntegrity } = require("../services/blockchainService");

exports.verifyBlockchain = async (req, res) => {
  try {
    const result = await verifyIntegrity();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erro na verificação da blockchain:", error);
    return res
      .status(500)
      .json({ error: "Erro interno na verificação da blockchain." });
  }
};
