import express from "express";
import { classifyDocument } from "../controllers/classifierController";

const router = express.Router();

router.post("/", classifyDocument as express.RequestHandler);

export default router;
