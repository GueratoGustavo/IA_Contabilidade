import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET: string =
  process.env.JWT_SECRET || "umasecretamuitosegura123!";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "7d";

interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

interface AuthRequest extends Request {
  user?: { userId: string; email: string };
}

const users: User[] = [];

const findUserByEmail = (email: string): User | undefined =>
  users.find((u) => u.email === email.toLowerCase());

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !validator.isEmail(email) ||
    password.length < 6
  ) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  if (findUserByEmail(email)) {
    return res.status(400).json({ error: "Email já cadastrado" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: uuidv4(),
    name: name.trim(),
    email: email.toLowerCase(),
    passwordHash,
  };

  users.push(newUser);

  res.status(201).json({
    message: "Usuário registrado com sucesso",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password || !validator.isEmail(email)) {
    return res
      .status(400)
      .json({ error: "Email e senha obrigatórios e válidos" });
  }

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions);

  res.json({
    message: "Login bem-sucedido",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token JWT não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
    };
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Token JWT inválido" });
  }
};

export const getProfile = (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
};
