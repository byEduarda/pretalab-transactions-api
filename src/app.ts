import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import purchaseRoutes from "./routes/purchaseRoutes";
import checkoutRoutes from "./routes/checkoutRoutes";

import { aiResponse } from "./controller/ai";
import { ai } from "./services/prompt";

dotenv.config();

const PORT = parseInt(process.env.PORT || "3000", 10);
const app = express();

app.use(express.json());
app.use(cors());

app.use("/products", productRoutes);
app.use("/transactions", transactionRoutes);
app.use("/purchases", purchaseRoutes);
app.use("/checkout", checkoutRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "Transactions API v2.1" });
});

app.post("/ai", async (req, res) => aiResponse(req, res));
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const resposta = await ai(prompt);
  res.json({ resposta });
});

export default app;
