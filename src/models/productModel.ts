export interface Product {
  id: string;
  name: string;
  price: number;
}

export const products: Product[] = [
  { id: "1", name: "Notebook Gamer Pro", price: 7500 },
  { id: "2", name: "Mouse Sem Fio Ultra-leve", price: 350 },
  { id: "3", name: "Teclado Mecânico RGB", price: 550 },
  { id: "4", name: "Monitor 4K 27\"", price: 2500 }
];
