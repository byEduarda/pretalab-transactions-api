import { Request, Response } from "express";
import { createPurchase, getAllPurchases, getPurchaseById } from "../services/purchaseService";
import { Purchase } from "../models/purchaseModel";

export const checkout = (req: Request, res: Response) => {
  const newPurchase: Purchase | null = createPurchase(req.body);
  if (!newPurchase) {
    return res.status(400).json({ message: "O valor total da compra excede o limite de R$20.000." });
  }
  return res.status(201).json(newPurchase);
};

export const listPurchases = (_req: Request, res: Response) => {
  return res.status(200).json(getAllPurchases());
};

export const getPurchase = (req: Request, res: Response) => {
  const purchase = getPurchaseById(req.params.id);
  if (!purchase) return res.status(404).json({ message: "Compra não encontrada" });
  return res.status(200).json(purchase);
};
