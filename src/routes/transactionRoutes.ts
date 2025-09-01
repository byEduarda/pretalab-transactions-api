import { Router } from "express";
import * as transactionController from "../controller/transactionController";

const router = Router();

router.get("/transactions", transactionController.getAllTransactions);
router.get("/transactions/:id", transactionController.getTransaction);
router.post("/transactions", transactionController.create);

export default router;
