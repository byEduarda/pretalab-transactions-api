import express from "express";
import cors from "cors";
import { transactions } from "./data/data";
import { getTransactionById } from "./controller/transaction";
import { aiResponse } from "./controller/ai";
import { ai } from "./services/prompt";
import productsRoutes from "./routes/products";
import transactionsRoutes from "./routes/transactions";
import purchasesRoutes from "./routes/purchases";
import dotenv from "dotenv";
dotenv.config();

const PORT = parseInt(process.env.PORT || "3000", 10);
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", productsRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/purchases", purchasesRoutes);

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

app.use((_req, res) => {
  res.status(404).json({ message: "Endpoint não encontrado" });
});


export default app;
