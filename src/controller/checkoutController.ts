import { Request, Response } from "express";
import * as checkoutService from "../services/checkoutService";

export const checkout = async (req: Request, res: Response) => {
  try {
    const { cart, total } = req.body;

    const purchase = await checkoutService.processCheckout(cart, total);

    res.status(200).json({ message: "Compra processada com sucesso!" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
