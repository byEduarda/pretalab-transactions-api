import { Request, Response } from "express";
import * as transactionService from "../services/transactionService";
import { Transaction } from "../models/transactionModel";
import { v4 as uuidv4 } from "uuid";

export const getTransactions = (_req: Request, res: Response) => {
  res.json(transactionService.getAllTransactions());
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