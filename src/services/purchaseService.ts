import { purchases } from "../models//purchaseModel";

export const getPurchaseById = (id: string) => {
  return purchases.find(p => p.id === id);
};

export const getAllPurchases = () => {
  return purchases;
};
