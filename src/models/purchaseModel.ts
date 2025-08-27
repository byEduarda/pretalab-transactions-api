export interface PurchaseItem {
  productId: string;
  quantity: number;
  name: string;
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
    id: "1",
    date: "2024-07-28T14:45:12Z",
    total: 7850,
    items: [
      { productId: "1", quantity: 1, name: "Notebook Gamer Pro", price: 7500 },
    ],
  },
];
