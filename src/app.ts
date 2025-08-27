import express from "express";
import cors from 'cors';

import productRoutes from "./routes/productRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import purchaseRoutes from "./routes/purchaseRoutes";

import { transactions } from "./models/data";
import { getTransactionById } from "./controller/transaction";
import { aiResponse } from "./controller/ai";
import { ai } from "./services/prompt";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/purchases", purchaseRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "Transactions API v2.1" });
});

app.get("/transactions", (_req, res) => {
  res.json({ transactions });
});
app.get("/transactions/:id", getTransactionById);


app.post("/ai", async (req, res) => aiResponse(req, res));
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const resposta = await ai(prompt);
  res.json({ resposta });
});

export default app;
  

