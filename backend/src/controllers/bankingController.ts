import { Request, Response } from "express";
import BankingService from "../services/bankingService";

export const getAccounts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const accounts = await BankingService.getAccounts();
    res.json({ accounts });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar contas" });
  }
};

export const getTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const transactions = await BankingService.getTransactions();
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar transações" });
  }
};

export const connectBank = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await BankingService.connectBank();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Erro ao conectar banco" });
  }
};

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "Arquivo não enviado" });
      return;
    }

    const { originalname, mimetype, size } = req.file;

    res.status(200).json({
      message: "Arquivo recebido com sucesso",
      nome: originalname,
      tipo: mimetype,
      tamanhoMB: (size / (1024 * 1024)).toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao processar o arquivo" });
  }
};
