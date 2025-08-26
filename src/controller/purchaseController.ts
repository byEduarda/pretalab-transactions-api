import { Request, Response } from "express";
import * as purchaseService from "../services/purchaseService";

export const checkout = (req: Request, res: Response) => {
  try {
    const { cart, total } = req.body;
    const purchase = purchaseService.createPurchase(cart, total);
    res.status(201).json(purchase);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getPurchases = (_req: Request, res: Response) => {
  res.json(purchaseService.getAllPurchases());
};

export const getPurchase = (req: Request, res: Response) => {
  const purchase = purchaseService.getPurchaseById(req.params.id);
  if (!purchase) return res.status(404).json({ message: "Compra não encontrada." });
  res.json({ purchase });
};
