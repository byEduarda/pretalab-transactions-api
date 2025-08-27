export interface PurchaseItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Purchase {
  id: string;
  date: string;
  items: PurchaseItem[];
  total: number;
}

export const purchases: Purchase[] = [
  {
    id: "1",
    date: "2024-07-28T14:45:12Z",
    total: 7850,
    items: [
      { productId: "1", quantity: 1, name: "Notebook Gamer Pro", price: 7500 },
      { productId: "2", quantity: 1, name: "Mouse Sem Fio Ultra-leve", price: 350 },
    ],
  },
  {
    id: "2",
    date: "2024-08-02T11:20:30Z",
    total: 1050,
    items: [
      { productId: "3", quantity: 1, name: "Teclado Mecânico RGB", price: 550 },
      { productId: "5", quantity: 1, name: "Headset 7.1 Surround", price: 500 },
    ],
  },
  {
    id: "3",
    date: "2024-08-10T09:15:00Z",
    total: 2900,
    items: [
      { productId: "4", quantity: 1, name: "Monitor 4K 27\"", price: 2500 },
      { productId: "6", quantity: 1, name: "Webcam Full HD", price: 400 },
    ],
  },
  {
    id: "4",
    date: "2024-08-15T16:40:00Z",
    total: 800,
    items: [
      { productId: "7", quantity: 1, name: "SSD NVMe 1TB", price: 800 },
    ],
  },
  {
    id: "5",
    date: "2024-08-20T13:05:45Z",
    total: 9000,
    items: [
      { productId: "1", quantity: 1, name: "Notebook Gamer Pro", price: 7500 },
      { productId: "5", quantity: 1, name: "Headset 7.1 Surround", price: 600 },
      { productId: "2", quantity: 1, name: "Mouse Sem Fio Ultra-leve", price: 350 },
    ],
  },
];
