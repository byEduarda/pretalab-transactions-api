import { Router } from "express";
import { getAllPurchases, getPurchaseById } from "../controller/purchaseController";

const router = Router();

router.get("/", getAllPurchases);
router.get("/:id", getPurchaseById);

export default router;
