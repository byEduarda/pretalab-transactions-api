import express from 'express';
import cors from 'cors';

import productRoutes from './routes/productRoutes';
import transactionRoutes from './routes/transactionRoutes';
import purchaseRoutes from './routes/purchaseRoutes';

import { aiResponse, chat } from './controller/aiController';
import { startSync } from './controller/syncController';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', productRoutes);
app.use('/api', transactionRoutes);
app.use('/api', purchaseRoutes);
app.use('/api', productRoutes);

app.post('/api/ai', aiResponse);
app.post('/api/chat', chat);

app.post('/api/sync-products', startSync);

app.get('/', (_req, res) => {
  res.json({ message: 'Transactions API v2.1' });
});

export default app;