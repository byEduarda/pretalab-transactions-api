import { Router } from 'express';
import { getTransactions, getTransactionById, createTransaction} from '../controller/transactionController';

const router = Router();

router.get('/transactions', getTransactions);
router.get('/transactions/:id', getTransactionById);
router.post('/transactions', createTransaction);

export default router;