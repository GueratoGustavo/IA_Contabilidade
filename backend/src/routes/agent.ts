import { Router } from "express";
import {
  agentConversation,
  getAgentTasks,
  createAgentTask,
} from "../controllers/agentController";

const router = Router();

router.post("/conversation", agentConversation);
router.get("/tasks", getAgentTasks);
router.post("/tasks", createAgentTask);

export default router;
