import { Request, Response } from "express";
import * as checkoutService from "../services/checkoutService";

export const checkout = (req: Request, res: Response) => {
  try {
    if (!req.body || !Array.isArray(req.body.items)) {
      return res.status(400).json({ message: "Items inválidos ou não enviados" });
    }

    const newPurchase = checkoutService.processCheckout(req.body);
    res.status(201).json(newPurchase);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
