import { purchases } from "../models/purchaseModel";

export const processCheckout = (data: { items: any[] }) => {
  const items = data.items || []; 

  if (items.length === 0) throw new Error("Nenhum item foi enviado para o checkout.");

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (total > 20000) throw new Error("O valor total da compra excede o limite de R$20.000.");

  const newPurchase = {
    id: String(Date.now()),
    date: new Date().toISOString(),
    items,
    total,
  };

  purchases.push(newPurchase);

  return newPurchase;
};