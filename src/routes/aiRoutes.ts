import { Router } from "express";
import { chat } from "../controller/aiController";

const router = Router();
router.post("/chat", chat);

export default router;
