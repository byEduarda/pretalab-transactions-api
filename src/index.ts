import express from "express";
import cors from 'cors';
import { transactions } from "./data";
import { getTransactionById } from "./controller/transaction";
import { aiResponse } from "./controller/ai";
import { ai } from "./services/prompt";
import dotenv from "dotenv";
dotenv.config();


const PORT = parseInt(process.env.PORT || "3000", 10);
const app = express();
app.use(express.json());
app.use(cors());
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


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});    

export default app;
  