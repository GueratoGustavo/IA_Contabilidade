import { Request, Response, NextFunction } from "express";
import validator from "validator";

export function validateUser(req: Request, res: Response, next: NextFunction) {
  const { name, email } = req.body;
  if (!name || !email || !validator.isEmail(email)) {
    return res
      .status(400)
      .json({ error: "Nome e email válidos são obrigatórios" });
  }
  next();
}
