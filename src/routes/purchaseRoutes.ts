import { Router } from "express";
import { checkout, listPurchases, getPurchase } from "../controller/purchaseController";

const router = Router();

router.get("/", listPurchases);
router.get("/:id", getPurchase);
router.post("/", checkout);

export default router;
