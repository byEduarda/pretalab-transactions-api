import { Router } from "express";
import { checkout } from "../controller/checkoutController";

const router = Router();

router.post("/", checkout);

export default router;