import { Router } from "express";
import { getTransactions, getTransaction, addTransaction } from "../controller/transactionController";

const router = Router();

router.get("/", getTransactions);
router.post("/", addTransaction);
router.get("/:id", getTransaction);

export default router;
