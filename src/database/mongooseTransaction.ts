import { Schema, model, Document } from 'mongoose';

export interface Transaction extends Document {
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

const transactionSchema = new Schema<Transaction>({
  date: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true },
});

const TransactionModel = model<Transaction>('Transaction', transactionSchema);

export default TransactionModel;