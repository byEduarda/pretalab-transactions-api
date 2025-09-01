import { TransactionModel, Transaction } from "../database/mongooseTransaction";

export const getAllTransactions = async (filters?: {
  type?: "income" | "expense";
  category?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}): Promise<Transaction[]> => {
  const query: any = {};

  if (filters?.type) query.type = filters.type;
  if (filters?.category) query.category = filters.category;
  if (filters?.startDate || filters?.endDate) {
    query.date = {};
    if (filters.startDate) query.date.$gte = new Date(filters.startDate);
    if (filters.endDate) query.date.$lte = new Date(filters.endDate);
  }
  if (filters?.minAmount || filters?.maxAmount) {
    query.amount = {};
    if (filters.minAmount !== undefined) query.amount.$gte = filters.minAmount;
    if (filters.maxAmount !== undefined) query.amount.$lte = filters.maxAmount;
  }

  return await TransactionModel.find(query).sort({ date: -1 });
};

export const getTransactionById = async (id: string): Promise<Transaction | null> => {
  return await TransactionModel.findById(id);
};

export const createTransaction = async (transaction: Transaction): Promise<Transaction> => {
  const newTransaction = new TransactionModel(transaction);
  return await newTransaction.save();
};
