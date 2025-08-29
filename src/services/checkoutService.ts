import { v4 as uuidv4 } from "uuid";

interface CartItem {
  productId: string;
  quantity: number;
  price?: number;
}

let localCart: CartItem[] = [
  { productId: "1", quantity: 1, price: 7500 },
  { productId: "2", quantity: 2, price: 350 },
];

export const processCheckout = async (
  cart: CartItem[],
  totalFromClient?: number
) => {
  if (!cart || cart.length === 0) {
    throw new Error("Carrinho vazio ou inválido");
  }

  cart.forEach((item) => {
    if (!item.productId || item.quantity <= 0) {
      throw new Error("Dados da compra inválidos.");
    }
  });

  const cartWithPrices = cart.map((item) => {
    const local = localCart.find((c) => c.productId === String(item.productId));
    if (!local) throw new Error("Produto não encontrado.");
    return { ...item, price: local.price! };
  });

  const total = cartWithPrices.reduce(
    (sum, item) => sum + item.price! * item.quantity,
    0
  );

  if (total > 20000) {
    throw new Error("O valor total da compra excede o limite de R$20.000.");
  }

  if (totalFromClient && totalFromClient !== total) {
    throw new Error("Total enviado não confere com o calculado.");
  }

  return {
    id: uuidv4(),
    date: new Date().toISOString(),
    items: cartWithPrices,
    total,
  };
};
