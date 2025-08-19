import { Request, Response } from "express";
import { transactions, Transaction } from "../data/transactions";

export const getAllTransactions = (_req: Request, res: Response) => {
  return res.json(transactions);
};

export const getTransactionById = (req: Request, res: Response) => {
  const { id } = req.params;
  const found = transactions.find(t => t.id === id);
  if (!found) return res.status(404).json({ message: "Transação não encontrada" });
  return res.json(found);
};

export const createTransaction = (req: Request, res: Response) => {
  const { description, amount, type, category } = req.body as Partial<Transaction>;

  if (!description || typeof amount !== "number" || !type || !category) {
    return res.status(400).json({ message: "Campos obrigatórios: description, amount, type, category" });
  }
  if (type !== "income" && type !== "expense") {
    return res.status(400).json({ message: "type deve ser 'income' ou 'expense'" });
  }

  const newTransaction: Transaction = {
    id: (transactions.length + 1).toString(),
    description,
    amount,
    type,
    category,
    date: new Date().toISOString(),
  };

  transactions.push(newTransaction);
  return res.status(201).json(newTransaction);
};
