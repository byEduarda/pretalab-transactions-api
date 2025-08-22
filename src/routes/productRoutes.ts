import { Router } from "express";
import { getProducts, getProduct, addProduct } from "../controller/productController";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", addProduct);

export default router;
