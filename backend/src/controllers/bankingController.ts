import { Request, Response } from "express";
import BankingService from "../services/bankingService";

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await BankingService.getAccounts();
    res.json({ accounts });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar contas" });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await BankingService.getTransactions();
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar transações" });
  }
};

export const connectBank = async (req: Request, res: Response) => {
  try {
    const result = await BankingService.connectBank();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Erro ao conectar banco" });
  }
};
