import { Request, Response } from "express";

export const getAccounts = (req: Request, res: Response) => {
  res.json({
    accounts: [
      { id: "acc1", name: "Conta Corrente", balance: 4500 },
      { id: "acc2", name: "Conta Poupança", balance: 12000.5 },
    ],
  });
};

export const getTransactions = (req: Request, res: Response) => {
  res.json({
    transactions: [
      { id: "tx1", description: "Supermercado", amount: -150.5 },
      { id: "tx2", description: "Salário", amount: 5000 },
    ],
  });
};

export const connectBank = (req: Request, res: Response) => {
  res.json({ message: "Banco conectado com sucesso" });
};
