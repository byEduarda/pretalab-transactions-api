import TransactionModel, { Transaction } from "../database/mongooseTransaction";

export const createTransaction = async (
  transactionData: Omit<Transaction, "_id" | "__v">
): Promise<Transaction> => {
  const transaction = await TransactionModel.create(transactionData);
  return transaction;
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
  return TransactionModel.find();
};

export const getTransactionById = async (
  id: string
): Promise<Transaction | null> => {
  return TransactionModel.findById(id);
};
