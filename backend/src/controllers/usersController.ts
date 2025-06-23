import { Request, Response } from "express";
import { UserService } from "../services/userService";

export const getUsers = async (_req: Request, res: Response) => {
  const users = await UserService.getUsers();
  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.getUserById(id);

  if (!user) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return;
  }

  res.status(200).json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const newUser = await UserService.createUser(name, email);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedUser = await UserService.updateUser(id, name, email);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await UserService.deleteUser(id);
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
