import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";

const users = [
  { id: "1", name: "Gustavo", email: "gustavo@email.com", password: "123456" },
];

export const register = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password || !validator.isEmail(email)) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "Email já cadastrado" });
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
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

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha obrigatórios" });
  }

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  res.json({
    message: "Login bem-sucedido",
    token: "fake-jwt-token",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};

export const getProfile = (req: Request, res: Response) => {
  const user = users[0];

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};
