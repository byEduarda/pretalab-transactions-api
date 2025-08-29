import { Transaction } from "../database/mongooseTransaction";

interface Filter {
  type?: "income" | "expense";
  category?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface TransactionInput {
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

export class TransactionService {
  static async getTransactions(filter: Filter) {
    const query: any = {};

    if (filter.type) query.type = filter.type;
    if (filter.category) query.category = filter.category;
    if (filter.startDate || filter.endDate) query.date = {};
    if (filter.startDate) query.date.$gte = new Date(filter.startDate);
    if (filter.endDate) query.date.$lte = new Date(filter.endDate);
    if (filter.minAmount || filter.maxAmount) query.amount = {};
    if (filter.minAmount) query.amount.$gte = filter.minAmount;
    if (filter.maxAmount) query.amount.$lte = filter.maxAmount;

    return Transaction.find(query).sort({ date: -1 });
  }

  static async getTransactionById(id: string) {
    return Transaction.findById(id);
  }

  static async createTransaction(data: TransactionInput) {
    const transaction = new Transaction(data);
    return transaction.save();
  }
}
