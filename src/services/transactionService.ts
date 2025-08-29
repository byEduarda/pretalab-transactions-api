import { Transaction, transactions } from "../models/transactionModel";

export const getAllTransactions = (): Transaction[] => transactions;

export const getTransactionById = (id: string): Transaction | undefined =>
  transactions.find(t => t.id === id);

export const createTransaction = (data: Omit<Transaction, "id" | "date">): Transaction => {
  const newTransaction: Transaction = {
    ...data,
    id: (transactions.length + 1).toString(),
    date: new Date().toISOString(),
  };
  transactions.push(newTransaction);
  return newTransaction;
};
