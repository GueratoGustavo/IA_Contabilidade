import { RequestHandler } from "express";
import {
  agentConversationService,
  getAgentTasksService,
  createAgentTaskService,
} from "../services/agentService";

export const agentConversation: RequestHandler = (req, res) => {
  const { message } = req.body;

  if (!message) {
    res.status(400).json({ error: "Mensagem é obrigatória" });
    return;
  }

  const reply = agentConversationService(message);
  res.json({ reply });
};

export const getAgentTasks: RequestHandler = (req, res) => {
  const tasks = getAgentTasksService();
  res.json({ tasks });
};

export const createAgentTask: RequestHandler = (req, res) => {
  const { description } = req.body;

  if (!description) {
    res.status(400).json({ error: "Descrição é obrigatória" });
    return;
  }

  const task = createAgentTaskService(description);
  res.status(201).json({
    message: "Tarefa criada com sucesso",
    task,
  });
};
