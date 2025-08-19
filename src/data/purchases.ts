export type PurchaseItem = {
  productId: number;
  quantity: number;
  name: string;
  price: number;
};

export type Purchase = {
  id: string;
  date: string; 
  total: number;
  items: PurchaseItem[];
};

export const purchases: Purchase[] = [];
