import { purchases, Purchase, PurchaseItem } from "../models/purchaseModel";
import { products } from "../models/productModel";
import { v4 as uuidv4 } from "uuid";

export const createPurchase = (
  cart: { productId: number | string; quantity: number }[],
  total: number
): Purchase => {
  if (!cart || total <= 0) throw new Error("Dados da compra inválidos.");
  if (total > 20000) throw new Error("O valor total da compra excede o limite de R$20.000.");

  const items: PurchaseItem[] = cart.map((c) => {
    const product = products.find((p) => p.id === Number(c.productId));
    return {
      productId: Number(c.productId),
      quantity: c.quantity,
      name: product?.name || "Produto não encontrado",
      price: product?.price || 0,
    };
  });

  const newPurchase: Purchase = {
    id: uuidv4(),
    date: new Date().toISOString(),
    total,
    items,
  };

  purchases.unshift(newPurchase);
  return newPurchase;
};

export const getAllPurchases = (): Purchase[] => purchases;

export const getPurchaseById = (id: string): Purchase | undefined =>
  purchases.find((p) => p.id === id);
