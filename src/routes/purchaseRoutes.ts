import { Router } from 'express';
import { checkout, getPurchases, getPurchaseById } from '../controller/purchaseController';

const router = Router();

router.post('/checkout', checkout);
router.get('/purchases', getPurchases);
router.get('/purchases/:id', getPurchaseById);

export default router;