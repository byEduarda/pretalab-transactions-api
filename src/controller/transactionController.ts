import { Request, Response } from 'express';
import * as transactionService from '../services/transactionService';

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await transactionService.getAllTransactions(req.query);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar transações.' });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const transaction = await transactionService.getTransactionById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transação não encontrada.' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar transação.' });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const savedTransaction = await transactionService.createTransaction(req.body);
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar a transação.' });
  }
};