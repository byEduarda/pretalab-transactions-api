import { Router } from "express";
import { getAllProducts } from "../controller/productsController";

const router = Router();

router.get("/", getAllProducts);

export default router;
