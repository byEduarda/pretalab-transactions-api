import { transactions, Transaction } from "../models/transactionModel";

export const getAllTransactions = (): Transaction[] => transactions;

export const getTransactionById = (id: string): Transaction | undefined =>
  transactions.find((t) => t.id === id);

export const createTransaction = (transaction: Transaction): Transaction => {
  transactions.push(transaction);

  return transaction;
};