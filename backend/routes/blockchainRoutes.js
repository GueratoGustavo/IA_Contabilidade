const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { verifyBlockchain } = require("../controllers/blockchainController");

router.get("/verify", authMiddleware, verifyBlockchain);

module.exports = router;
