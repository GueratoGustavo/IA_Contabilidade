import { Router, Request, Response } from "express";
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

const router = Router();

router.get("/", (req: Request, res: Response<User[]>) => {
  console.log("Fetching all users");
  res.json(users);
});

router.get(
  "/:id",
  (req: Request<{ id: string }>, res: Response<User | { error: string }>) => {
    const id = req.params.id;
    const user = users.find((u) => u.id === id);
    if (!user) {
      res.status(404).json({ error: "Usuário não encontrado" });
    } else {
      res.json(user);
    }
  }
);

router.post(
  "/",
  (
    req: Request<{}, {}, { name: string; email: string }>,
    res: Response<User | { error: string }>
  ) => {
    const { name, email } = req.body;
    if (!name || !email || !validator.isEmail(email)) {
      res.status(400).json({ error: "Nome e email válidos são obrigatórios" });
    } else {
      const newUser: User = {
        id: uuidv4(),
        name,
        email,
      };
      users.push(newUser);
      res.status(201).json(newUser);
    }
  }
);

router.put(
  "/:id",
  (
    req: Request<{ id: string }, {}, Partial<User>>,
    res: Response<User | { error: string }>
  ) => {
    const id = req.params.id;
    const user = users.find((u) => u.id === id);
    if (!user) {
      res.status(404).json({ error: "Usuário não encontrado" });
    } else {
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
    }
  }
);

router.delete(
  "/:id",
  (
    req: Request<{ id: string }>,
    res: Response<{ message: string } | { error: string }>
  ) => {
    const id = req.params.id;
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      res.status(404).json({ error: "Usuário não encontrado" });
    } else {
      users.splice(index, 1);
      res.json({ message: "Usuário deletado" });
    }
  }
);

export default router;
