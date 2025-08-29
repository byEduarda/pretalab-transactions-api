import { Router } from "express";
import { getAllTransactions, getTransactionById, createTransaction } from "../controller/transactionController";

const router = Router();

router.get("/", getAllTransactions);
router.post("/", createTransaction);
router.get("/:id", getTransactionById);

export default router;
