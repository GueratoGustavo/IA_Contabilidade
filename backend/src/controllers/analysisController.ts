import { Request, Response } from "express";

export const getCashflow = (req: Request, res: Response) => {
  res.json({
    cashflow: {
      income: 8000,
      expenses: 5000,
      balance: 3000,
    },
  });
};

export const getSummary = (req: Request, res: Response) => {
  res.json({
    summary: {
      totalAccounts: 2,
      totalTransactions: 15,
      monthlyIncome: 8000,
      monthlyExpenses: 5000,
    },
  });
};

export const getPredictions = (req: Request, res: Response) => {
  res.json({
    predictions: {
      nextMonthBalance: 3200,
      expenseTrend: "Aumentando 5%",
      incomeTrend: "Estável",
    },
  });
};
