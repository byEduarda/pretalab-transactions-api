import { Request, Response } from "express";
import * as productService from "../services/productService";

export const getAllProducts = (req: Request, res: Response) => {
  res.status(200).json(productService.getAllProducts());
};

export const getProductById = (req: Request, res: Response) => {
  const product = productService.getProductById((req.params.id));
  if (!product) return res.status(404).json({ message: "Produto não encontrado" });
  res.status(200).json(product);
};
