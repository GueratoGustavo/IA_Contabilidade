import { Request, Response } from "express";
import {
  getCashflowService,
  getSummaryService,
  getPredictionsService,
} from "../services/analysisService";

export const getCashflow = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const cashflow = await getCashflowService(userId);
  res.json({ cashflow });
};

export const getSummary = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const summary = await getSummaryService(userId);
  res.json({ summary });
};

export const getPredictions = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const predictions = await getPredictionsService(userId);
  res.json({ predictions });
};
