import { Router } from 'express';
import { getAllProducts, getProductById } from '../controller/productController';

const router = Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);

export default router;