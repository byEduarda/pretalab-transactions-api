import { Router } from "express";
import * as transactionController from "../controller/transactionController";

const router = Router();

router.get("/", transactionController.getAllTransactions);
router.get("/:id", transactionController.getTransactionById);
router.post("/", transactionController.createTransaction);

export default router;
