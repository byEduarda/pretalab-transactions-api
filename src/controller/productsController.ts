import { Request, Response } from "express";
import { products } from "../data/products";

export const getAllProducts = (_req: Request, res: Response) => {
  return res.json(products);
};
