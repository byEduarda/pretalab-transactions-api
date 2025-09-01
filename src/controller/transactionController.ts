import { Request, Response } from "express";
import * as transactionService from "../services/transactionService";

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await transactionService.getTransactions(req.query);
    return res.json(transactions);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar transações." });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const transaction = await transactionService.getTransactionById(req.params.id);
    return res.json(transaction);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar transação por ID." });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await transactionService.createTransaction(req.body);
    return res.status(201).json(transaction);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar transação." });
  }
};
