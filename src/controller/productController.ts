import { Request, Response } from 'express';
import ProductModel from '../database/mongooseProduct'; 

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ message: "Erro ao buscar produto" });
  }
};