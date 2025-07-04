const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");

async function registrarDocumento(docId, hash, metadata) {
  const ccpPath = path.resolve(__dirname, "../network/connection-org1.json");
  const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

  const walletPath = path.join(process.cwd(), "wallet");
  const wallet = await Wallets.newFileSystemWallet(walletPath);

  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: "admin",
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork("mychannel");
  const contract = network.getContract("auditor");

  const result = await contract.submitTransaction(
    "registrarDocumento",
    docId,
    hash,
    metadata
  );

  await gateway.disconnect();
  return JSON.parse(result.toString());
}

module.exports = { registrarDocumento };
