import { Request, Response } from "express";
import * as checkoutService from "../services/checkoutService";

export const checkout = (req: Request, res: Response) => {
  try {
    const { items } = req.body;

    const newPurchase = checkoutService.processCheckout(items);

    return res.status(201).json(newPurchase);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};
