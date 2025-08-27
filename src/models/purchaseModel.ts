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
      { productId: "2", quantity: 1, name: "Mouse Gamer", price: 350 },
    ],
  },
  {
    id: "2",
    date: "2024-08-02T11:20:30Z",
    total: 1450,
    items: [
      { productId: "3", quantity: 2, name: "Teclado Mecânico", price: 700 },
      { productId: "4", quantity: 1, name: "Mousepad RGB", price: 50 },
    ],
  },
  {
    id: "3",
    date: "2024-08-10T09:15:00Z",
    total: 6200,
    items: [
      { productId: "5", quantity: 1, name: "Monitor 27'' 144Hz", price: 2500 },
      { productId: "6", quantity: 2, name: "Headset Gamer", price: 1850 },
    ],
  },
  {
    id: "4",
    date: "2024-08-15T16:40:00Z",
    total: 250,
    items: [
      { productId: "7", quantity: 5, name: "Cabo HDMI", price: 50 },
    ],
  },
  {
    id: "5",
    date: "2024-08-20T13:05:45Z",
    total: 10500,
    items: [
      { productId: "8", quantity: 1, name: "PC Gamer Completo", price: 10000 },
      { productId: "9", quantity: 1, name: "Mouse Gamer", price: 500 },
    ],
  },
];
