import { Request, Response } from "express";
import { getAllTransactions, getTransactionById, createTransaction } from "../services/transactionService";

export const TransactionById = (req: Request, res: Response) => {
  const transaction = getTransactionById(req.params.id);
  if (!transaction) return res.status(404).json({ message: "Transação não encontrada" });
  res.status(200).json({ transaction });
};

export const getTransactions = (_req: Request, res: Response) => {
  res.status(200).json({ getAllTransactions });
};

export const postTransaction = (req: Request, res: Response) => {
  try {
    const transaction = createTransaction(req.body);
    res.status(201).json({ transaction });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
