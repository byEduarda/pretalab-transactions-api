import { Router } from "express";
import * as productController from "../controller/productController";

const router = Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);

export default router;
