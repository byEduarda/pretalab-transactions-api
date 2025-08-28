import { Transaction, transactions } from "../models/transactionModel";

export const transactionById = (id: string): Transaction | undefined => {
  return transactions.find((transaction) => transaction.id === id);
};