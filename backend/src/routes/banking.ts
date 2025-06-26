import { Router } from "express";
import {
  getAccounts,
  getTransactions,
  connectBank,
  uploadFile,
} from "../controllers/bankingController";
import upload from "../middlewares/uploadMiddleware";

const router = Router();

router.get("/accounts", getAccounts);
router.get("/transactions", getTransactions);
router.post("/connect", connectBank);
router.post("/upload", upload.single("file"), uploadFile);

export default router;
