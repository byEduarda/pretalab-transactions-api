import TransactionModel from "../../src/database/mongooseTransaction";
import { FilterQuery } from "mongoose";

interface TransactionQuery {
  type?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: string;
  maxAmount?: string;
}

export const getAllTransactions = async (query: TransactionQuery) => {
  const filter: FilterQuery<any> = {};

  if (query.type) filter.type = query.type;
  if (query.category) filter.category = query.category;

  if (query.minAmount || query.maxAmount) {
    filter.amount = {};
    if (query.minAmount) filter.amount.$gte = Number(query.minAmount);
    if (query.maxAmount) filter.amount.$lte = Number(query.maxAmount);
  }

  if (query.startDate || query.endDate) {
    filter.date = {};
    if (query.startDate) filter.date.$gte = new Date(query.startDate);
    if (query.endDate) filter.date.$lte = new Date(query.endDate);
  }

  const transactions = await TransactionModel.find(filter);
  return transactions;
};

export const getTransactionById = async (id: string) => {
  const transaction = await TransactionModel.findById(id);
  return transaction;
};

export const createTransaction = async (data: any) => {
  const transaction = await TransactionModel.create(data);
  return transaction;
};
