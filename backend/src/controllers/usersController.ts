import { Request, Response, RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [
  { id: "1", name: "Gustavo", email: "gustavo@email.com" },
];

const findUserById = (id: string): User | undefined =>
  users.find((u) => u.id === id);

const isValidEmail = (email: unknown): email is string => {
  return typeof email === "string" && validator.isEmail(email);
};

const isValidName = (name: unknown): name is string => {
  return typeof name === "string" && name.trim().length > 0;
};

export const getUsers: RequestHandler = async (_req, res) => {
  res.status(200).json(users);
  return;
};

export const getUserById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user = findUserById(id);

  if (!user) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return;
  }

  res.status(200).json(user);
  return;
};

export const createUser: RequestHandler = async (req, res) => {
  const { name, email } = req.body;

  if (!isValidName(name) || !isValidEmail(email)) {
    res.status(400).json({ error: "Nome e email válidos são obrigatórios" });
    return;
  }

  const newUser: User = {
    id: uuidv4(),
    name: name.trim(),
    email: email.toLowerCase(),
  };

  users.push(newUser);

  res.status(201).json(newUser);
  return;
};

export const updateUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user = findUserById(id);

  if (!user) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return;
  }

  const { name, email } = req.body;

  if (name !== undefined) {
    if (!isValidName(name)) {
      res.status(400).json({ error: "Nome inválido" });
      return;
    }
    user.name = name.trim();
  }

  if (email !== undefined) {
    if (!isValidEmail(email)) {
      res.status(400).json({ error: "Email inválido" });
      return;
    }
    user.email = email.toLowerCase();
  }

  res.status(200).json(user);
  return;
};

export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return;
  }

  users.splice(index, 1);

  res.status(200).json({ message: "Usuário deletado com sucesso" });
  return;
};
