import { purchases } from "../models/purchaseModel";

export interface PurchaseItem {
  productId: string;
  quantity: number;
  name: string;
  price: number;
}

interface CheckoutData {
  items: PurchaseItem[];
}

export const processCheckout = (data: CheckoutData) => {
  const items: PurchaseItem[] = Array.isArray(data.items) ? data.items : [];

  if (items.length === 0) {
    throw new Error("Nenhum item válido foi enviado para o checkout.");
  }

  items.forEach((item: PurchaseItem, index: number) => {
    if (typeof item.price !== "number" || typeof item.quantity !== "number") {
      throw new Error(`Item inválido na posição ${index}. Price e quantity devem ser números.`);
    }
  });

  const total: number = items.reduce(
    (sum: number, item: PurchaseItem) => sum + item.price * item.quantity,
    0
  );

  if (total > 20000) {
    throw new Error("O valor total da compra excede o limite de R$20.000.");
  }

  const newPurchase = {
    id: String(Date.now()),
    date: new Date().toISOString(),
    items,
    total,
  };

  purchases.push(newPurchase);

  return newPurchase;
};
