import { Request, Response } from "express";
import { purchases, Purchase, PurchaseItem } from "../data/purchases";
import { products } from "../data/products";

type CheckoutBody = {
  items: { productId: number; quantity: number }[];
};

export const checkout = (req: Request, res: Response) => {
  const { items } = req.body as CheckoutBody;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "O carrinho (items) é obrigatório e não pode ser vazio." });
  }

  const detailedItems: PurchaseItem[] = [];
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      return res.status(400).json({ message: `Produto inválido: productId=${item.productId}` });
    }
    if (typeof item.quantity !== "number" || item.quantity <= 0) {
      return res.status(400).json({ message: `Quantidade inválida para productId=${item.productId}` });
    }
    detailedItems.push({
      productId: product.id,
      quantity: item.quantity,
      name: product.name,
      price: product.price,
    });
  }

  const total = detailedItems.reduce((acc, it) => acc + it.price * it.quantity, 0);

  if (total > 20000) {
    return res.status(400).json({
      message: "O valor total da compra excede o limite de R$20.000.",
    });
  }

  const newPurchase: Purchase = {
    id: (purchases.length + 1).toString(),
    date: new Date().toISOString(),
    total,
    items: detailedItems,
  };

  purchases.push(newPurchase);
  return res.status(201).json(newPurchase);
};

export const getAllPurchases = (_req: Request, res: Response) => {
  return res.json(purchases);
};

export const getPurchaseById = (req: Request, res: Response) => {
  const { id } = req.params;
  const found = purchases.find((p) => p.id === id);
  if (!found) return res.status(404).json({ message: "Compra não encontrada" });
  return res.json(found);
};
