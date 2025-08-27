import { Router } from "express";
import * as productController from "../controller/productController";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

export default router;
