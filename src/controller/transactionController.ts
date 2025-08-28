import { Request, Response } from "express";
import * as transactionService from "../services/transactionService";

export const getAllTransactions = (req: Request, res: Response) => {
  const transactions = transactionService.getAllTransactions();
  return res.status(200).json(transactions);
};

export const getTransactionById = (req: Request, res: Response) => {
  const transaction = transactionService.getTransactionById(req.params.id);
  if (!transaction) {
    return res.status(404).json({ message: "Transação não encontrada" });
  }
  return res.status(200).json(transaction);
};

export const createTransaction = (req: Request, res: Response) => {
  const newTransaction = transactionService.createTransaction(req.body);
  return res.status(201).json(newTransaction);
};
