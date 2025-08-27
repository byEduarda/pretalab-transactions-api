import { Request, Response } from "express";
import * as purchaseService from "../services/purchaseService";

export const getPurchaseById = (req: Request, res: Response) => {
  const purchase = purchaseService.getPurchaseById(req.params.id);
  if (!purchase) return res.status(404).json({ message: "Compra não encontrada" });
  res.status(200).json({ purchase });
};

export const getAllPurchases = (_req: Request, res: Response) => {
  const purchases = purchaseService.getAllPurchases();
  res.status(200).json({ purchases });
};
