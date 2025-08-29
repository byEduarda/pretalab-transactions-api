import { v4 as uuidv4 } from "uuid";

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Purchase {
  id: string;
  date: string;
  cart: CartItem[];
  total: number;
}

export const processCheckout = (cart: CartItem[], total: number): Purchase => {
  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    throw new Error("Dados da compra inválidos.");
  }

  if (typeof total !== "number" || total <= 0) {
    throw new Error("Dados da compra inválidos.");
  }

  if (total > 20000) {
    throw new Error("O valor total da compra excede o limite de R$20.000.");
  }

  return {
    id: uuidv4(),
    date: new Date().toISOString(),
    cart,
    total,
  };
};
