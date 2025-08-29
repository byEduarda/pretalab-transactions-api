import { transactions, Transaction } from "../models/transactionModel";

interface TransactionFilters {
  type?: "income" | "expense";
  category?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

export const getAllTransactions = (filters?: TransactionFilters): Transaction[] => {
  let result = transactions;

  if (!filters) return result;

  const { type, category, startDate, endDate, minAmount, maxAmount } = filters;

  if (type) {
    result = result.filter((t) => t.type === type);
  }

  if (category) {
    result = result.filter((t) => t.category === category);
  }

  if (startDate) {
    const start = new Date(startDate);
    result = result.filter((t) => new Date(t.date) >= start);
  }

  if (endDate) {
    const end = new Date(endDate);
    result = result.filter((t) => new Date(t.date) <= end);
  }

  if (minAmount !== undefined) {
    result = result.filter((t) => t.amount >= minAmount);
  }

  if (maxAmount !== undefined) {
    result = result.filter((t) => t.amount <= maxAmount);
  }

  return result;
};

export const getTransactionById = (id: string): Transaction | undefined =>
  transactions.find((t) => t.id === id);

export const createTransaction = (transaction: Transaction): Transaction => {
  transactions.push(transaction);
  return transaction;
};
