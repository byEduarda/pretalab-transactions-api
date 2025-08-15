import { Request, Response } from "express";
import { transactionById } from "../service/transactions";

export const getTransactionById = (req: Request, res: Response) => {
  const transaction = transactionById(req.params.id);

  if(!transaction) {
    return res.status(404).json({ message: "Transação não encontrada"})
  }

  res.json({ transaction });

};