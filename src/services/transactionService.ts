import { Transaction, transactions as localTransactions } from "../models/transactionModel";

const API_URL = "https://finshopping.vercel.app/api/products";

export const getAllTransactions = async (): Promise<Transaction[]> => {
  if (process.env.NODE_ENV === "test") return localTransactions; 

  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao buscar transações");
  return res.json();
};

export const getTransactionById = async (id: string): Promise<Transaction | null> => {
  if (process.env.NODE_ENV === "test") {
    const t = localTransactions.find((t) => t.id === id);
    return t || null;
  }

  const res = await fetch(`${API_URL}/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Erro ao buscar transação");
  return res.json();
};

export const createTransaction = async (data: Omit<Transaction, "id" | "date">): Promise<Transaction> => {
  if (process.env.NODE_ENV === "test") {
    const newTransaction: Transaction = {
      ...data,
      id: (localTransactions.length + 1).toString(),
      date: new Date().toISOString(),
    };
    localTransactions.push(newTransaction);
    return newTransaction;
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar transação");
  return res.json();
};
