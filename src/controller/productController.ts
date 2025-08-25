import { Request, Response } from "express";
import * as productService from "../services/productService";

export const getProducts = (_req: Request, res: Response) => {
  res.json(productService.getAllProducts());
};

export const getProduct = (req: Request, res: Response) => {
  const product = productService.getProductById(req.params.id);
  if (!product) return res.status(404).json({ message: "Produto não encontrado." });
  res.json(product);
};
