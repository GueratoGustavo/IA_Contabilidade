import { Request, Response, NextFunction } from "express";
import { classifyDocumentService } from "../services/classifierService";

export const classifyDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ error: "Campo 'text' é obrigatório" });

    const result = await classifyDocumentService(text);
    res.json({ classification: result });
  } catch (err) {
    next(err);
  }
};
