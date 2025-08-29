import { Request, Response } from "express";
import { Transaction } from "../database/mongooseTransaction";

export const getAllTransactions = async (req: Request, res: Response) => {
  const { type } = req.query;
  const filter = type ? { type } : {};
  const transactions = await Transaction.find(filter).sort({ date: 1 });
  return res.status(200).json(transactions);
};

export const getTransactionById = async (req: Request, res: Response) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) return res.status(404).json({ message: "Transação não encontrada." });
  return res.status(200).json(transaction);
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.create(req.body);
    return res.status(201).json(transaction);
  } catch (error) {
    return res.status(400).json({ message: "Erro ao criar transação.", error });
  }
};
