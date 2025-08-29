import { Request, Response } from "express";
import * as transactionService from "../services/transactionService";
import { Transaction } from "../models/transactionModel";
import { v4 as uuidv4 } from "uuid";

export const getTransactions = (req: Request, res: Response) => {
  const filters = {
    type: req.query.type as "income" | "expense" | undefined,
    category: req.query.category as string | undefined,
    startDate: req.query.startDate as string | undefined,
    endDate: req.query.endDate as string | undefined,
    minAmount: req.query.minAmount ? Number(req.query.minAmount) : undefined,
    maxAmount: req.query.maxAmount ? Number(req.query.maxAmount) : undefined,
  };

  const transactions = transactionService.getAllTransactions(filters);
  res.json(transactions);
};

export const getTransaction = (req: Request, res: Response) => {
  const transaction = transactionService.getTransactionById(req.params.id);
  if (!transaction) return res.status(404).json({ message: "Transação não encontrada." });
  res.json(transaction);
};

export const addTransaction = (req: Request, res: Response) => {
  const newTransaction: Transaction = { id: uuidv4(), ...req.body };
  const saved = transactionService.createTransaction(newTransaction);
  res.status(201).json(saved);
};
