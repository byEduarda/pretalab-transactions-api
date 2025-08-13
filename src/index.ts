import express from "express";
import { transactions } from "./data";
import { getTransactionById } from "./controller/transaction";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Transactions API v2.1" });
});

app.get("/transactions", (_req, res) => {
  res.json({ transactions });
});


export default app;