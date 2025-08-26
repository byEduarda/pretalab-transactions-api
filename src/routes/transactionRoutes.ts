import { Router } from "express";
import { getTransactions } from "../controller/transactionController";
import { getTransactionById } from "../controller/transaction";

const router = Router();

router.get("/", getTransactions);
router.get("/:id", getTransactionById);


export default router;
