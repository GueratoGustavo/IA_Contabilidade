import { Router } from "express";
import {
  getCashflow,
  getSummary,
  getPredictions,
} from "../controllers/analysisController";

const router = Router();

router.get("/cashflow", getCashflow);
router.get("/summary", getSummary);
router.get("/predictions", getPredictions);

export default router;
