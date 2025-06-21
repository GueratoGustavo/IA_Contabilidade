import { Request, Response, RequestHandler } from "express";

export const agentConversation: RequestHandler = (req, res) => {
  const { message } = req.body;

  if (!message) {
    res.status(400).json({ error: "Mensagem é obrigatória" });
    return;
  }

  res.json({
    reply: `IA: Recebi sua mensagem "${message}". Como posso te ajudar mais?`,
  });
  return;
};

export const getAgentTasks: RequestHandler = (req, res) => {
  res.json({
    tasks: [
      { id: "task1", description: "Analisar fluxo de caixa" },
      { id: "task2", description: "Recomendar investimentos" },
    ],
  });
  return;
};

export const createAgentTask: RequestHandler = (req, res) => {
  const { description } = req.body;

  if (!description) {
    res.status(400).json({ error: "Descrição é obrigatória" });
    return;
  }

  res.status(201).json({
    message: "Tarefa criada com sucesso",
    task: { id: "task3", description },
  });
  return;
};
