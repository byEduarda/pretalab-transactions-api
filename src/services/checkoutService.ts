import { v4 as uuidv4 } from "uuid";

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

let localCart: CartItem[] = [
  { productId: "1", quantity: 1, price: 7500 },
  { productId: "2", quantity: 2, price: 350 },
];

const CART_API_URL = "https://finshopping.vercel.app/api/shopping";

export const getCartItems = async (): Promise<CartItem[]> => {
  if (process.env.NODE_ENV === "test") return localCart;

  const res = await fetch(CART_API_URL);
  if (!res.ok) throw new Error("Erro ao buscar itens do carrinho");
  return res.json();
};

export const processCheckout = async (items?: CartItem[]) => {
  let cartItems = items;

  if (!cartItems) {
    cartItems = await getCartItems();
  }

  if (!cartItems || cartItems.length === 0) {
    throw new Error("Carrinho vazio ou inválido");
  }

  const total = cartItems.reduce((sum, item) => {
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
    items: cartItems,
    total,
  };
};
