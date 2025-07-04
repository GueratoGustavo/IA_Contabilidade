const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const auth = require("../middlewares/authMiddleware");
const {
  uploadDocument,
  verificarIntegridade,
} = require("../controllers/documentController");

router.post("/upload", auth, upload.single("file"), uploadDocument);
router.post("/verify", auth, verificarIntegridade);

module.exports = router;
