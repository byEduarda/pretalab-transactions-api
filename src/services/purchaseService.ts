import { Purchase, purchases } from "../models/purchaseModel";

export const getAllPurchases = (): Purchase[] => purchases;

export const getPurchaseById = (id: string): Purchase | null =>
  purchases.find(p => p.id === id) || null;

export const createPurchase = (data: Omit<Purchase, "id" | "date">): Purchase | null => {
  const total = data.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  if (total > 20000) return null;

  const newPurchase: Purchase = {
    ...data,
    id: (purchases.length + 1).toString(),
    total,
    date: new Date().toISOString(),
  };
  purchases.push(newPurchase);
  return newPurchase;
};
