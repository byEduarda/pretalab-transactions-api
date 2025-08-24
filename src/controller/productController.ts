import { Request, Response } from "express";
import * as productService from "../services/productService";
import { Product } from "../models/productModel";
import { v4 as uuidv4 } from "uuid";

export const getProducts = (_req: Request, res: Response) => {
  res.json(productService.getAllProducts());
};

export const getProduct = (req: Request, res: Response) => {
  const product = productService.getProductById(req.params.id);
  if (!product) return res.status(404).json({ message: "Produto não encontrado." });
  res.json(product);
};

export const addProduct = (req: Request, res: Response) => {
  const newProduct: Product = {
    id: req.body.id ? String(req.body.id) : uuidv4(),
    name: req.body.name,
    price: req.body.price,
  };
  const saved = productService.createProduct(newProduct);
  res.status(201).json(saved);
};
