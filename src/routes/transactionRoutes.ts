import { Router } from "express";
import { getTransactions, getTransaction, addTransaction } from "../controller/transactionController";

const router = Router();

router.get("/", getTransactions);
router.get("/:id", getTransaction);
router.post("/", addTransaction);

export default router;
