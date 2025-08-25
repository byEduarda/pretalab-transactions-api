import { Router } from "express";
import { checkout, getPurchases, getPurchase } from "../controller/purchaseController";

const router = Router();

router.post("/checkout", checkout); 
router.get("/", getPurchases);      
router.get("/:id", getPurchase);    

export default router;
