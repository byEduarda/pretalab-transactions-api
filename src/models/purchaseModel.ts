export interface PurchaseItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Purchase {
  id: string;
  date: string;
  total: number;
  items: PurchaseItem[];
}

export const purchases: Purchase[] = [
  {
    id: "5eeb7f10-7ca4-4432-815d-0dc74021c91d",
    date: new Date().toISOString(),
    total: 7500,
    items: [
      { productId: "1", name: "Notebook Gamer Pro", quantity: 1, price: 7500 },
    ],
  },
];
