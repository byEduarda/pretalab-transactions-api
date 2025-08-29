import { Request, Response } from "express";
import * as checkoutService from "../services/checkoutService";

export const checkout = async (req: Request, res: Response) => {
  try {
    const { items } = req.body;

    const newPurchase = await checkoutService.processCheckout(items);

    res.status(201).json(newPurchase);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
