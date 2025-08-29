import { Schema, model, Document } from "mongoose";

export interface ITransaction extends Document {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
}

export const transactionSchema = new Schema<ITransaction>({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: String, required: true },
});

export const Transaction = model<ITransaction>("Transaction", transactionSchema); 
