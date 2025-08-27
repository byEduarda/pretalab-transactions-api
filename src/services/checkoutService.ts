import { purchases, PurchaseItem, Purchase } from "../models/purchaseModel";

interface CheckoutData {
  items: {
    productId?: string;
    name?: string;
    price?: number;
    quantity?: number;
  }[];
}

export const processCheckout = (data: CheckoutData): Purchase => {
  const items: PurchaseItem[] = Array.isArray(data.items) ? data.items.map((item, index) => {
    if (
      typeof item.productId !== "string" ||
      typeof item.name !== "string" ||
      typeof item.price !== "number" ||
      typeof item.quantity !== "number"
    ) {
      throw new Error(
        `Item inválido na posição ${index}. Deve conter productId, name, price e quantity válidos.`
      );
    }

    return {
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    };
  }) : [];

  if (items.length === 0) {
    throw new Error("Nenhum item válido foi enviado para o checkout.");
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (total > 20000) {
    throw new Error("O valor total da compra excede o limite de R$20.000.");
  }

  const newPurchase: Purchase = {
    id: String(Date.now()),
    date: new Date().toISOString(),
    items,
    total,
  };

  purchases.push(newPurchase);

  return newPurchase;
};
