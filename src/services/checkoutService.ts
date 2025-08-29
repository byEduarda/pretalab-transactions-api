import { v4 as uuidv4 } from "uuid";

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export const processCheckout = (items: CartItem[]) => {
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error("Dados da compra inválidos.");
  }

  const total = items.reduce((sum, item) => {
    if (!item.productId || item.quantity <= 0 || item.price <= 0) {
      throw new Error("Dados da compra inválidos.");
    }
    return sum + item.price * item.quantity;
  }, 0);

  if (total > 20000) {
    throw new Error("O valor total da compra excede o limite de R$20.000.");
  }

  return {
    id: uuidv4(),
    date: new Date().toISOString(),
    items,
    total,
  };
};
