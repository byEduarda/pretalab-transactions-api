import { Request, Response } from "express";
import { processCheckout } from "../services/checkoutService";

export const checkout = (req: Request, res: Response) => {
  try {
    const { cart, total } = req.body;

    const purchase = processCheckout(cart, total);

    return res.status(200).json({
      message: "Compra processada com sucesso!",
      purchase,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
