import { Request, Response, RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";

// Interface de usuário
interface User {
  id: string;
  name: string;
  email: string;
}

// Banco de dados em memória
const users: User[] = [
  { id: "1", name: "Gustavo", email: "gustavo@email.com" },
];

// 🟢 Listar todos os usuários
export const getUsers: RequestHandler = (req, res) => {
  res.json(users);
};

// 🟢 Buscar usuário por ID
export const getUserById: RequestHandler = (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);

  if (!user) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return;
  }

  res.json(user);
};

// 🟢 Criar novo usuário
export const createUser: RequestHandler = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email || !validator.isEmail(email)) {
    res.status(400).json({
      error: "Nome e email válidos são obrigatórios",
    });
    return;
  }

  const newUser: User = {
    id: uuidv4(),
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

// 🟢 Atualizar usuário
export const updateUser: RequestHandler = (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);

  if (!user) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return;
  }

  const { name, email } = req.body;

  if (name) user.name = name;
  if (email) {
    if (!validator.isEmail(email)) {
      res.status(400).json({ error: "Email inválido" });
      return;
    }
    user.email = email;
  }

  res.json(user);
};

// 🟢 Deletar usuário
export const deleteUser: RequestHandler = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return;
  }

  users.splice(index, 1);
  res.json({ message: "Usuário deletado com sucesso" });
};
