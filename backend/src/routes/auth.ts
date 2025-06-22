import express, { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

const users: User[] = [];
const SECRET_KEY = process.env.JWT_SECRET || "seu_segredo_super_secreto";

const router = express.Router();

const registerHandler: RequestHandler<
  {},
  { message: string } | { error: string },
  { name: string; email: string; password: string }
> = async (req, res): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
    return;
  }
  if (!validator.isEmail(email)) {
    res.status(400).json({ error: "Email inválido" });
    return;
  }
  if (users.some((u) => u.email === email)) {
    res.status(400).json({ error: "Email já cadastrado" });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  users.push({ id: uuidv4(), name, email, password: hashed });
  res.status(201).json({ message: "Usuário registrado com sucesso" });
};

const loginHandler: RequestHandler<
  {},
  { token: string } | { error: string },
  { email: string; password: string }
> = async (req, res): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email e senha são obrigatórios" });
    return;
  }
  if (!validator.isEmail(email)) {
    res.status(400).json({ error: "Email inválido" });
    return;
  }

  const user = users.find((u) => u.email === email);
  if (!user) {
    res.status(400).json({ error: "Credenciais inválidas" });
    return;
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    res.status(400).json({ error: "Credenciais inválidas" });
    return;
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "7d",
  });
  res.json({ token });
};

router.post("/register", registerHandler);
router.post("/login", loginHandler);

export default router;
