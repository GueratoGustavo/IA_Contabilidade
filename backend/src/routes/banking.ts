import { Router } from "express";
import {
  getAccounts,
  getTransactions,
  connectBank,
} from "../controllers/bankingController";

const router = Router();

router.get("/accounts", getAccounts);
router.get("/transactions", getTransactions);
router.post("/connect", connectBank);

export default router;
