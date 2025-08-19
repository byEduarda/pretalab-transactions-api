export type Product = {
  id: number;
  name: string;
  price: number;
};

export const products: Product[] = [
  { id: 1, name: "Notebook Gamer Pro", price: 7500 },
  { id: 2, name: "Mouse Gamer RGB", price: 250 },
  { id: 3, name: "Teclado Mecânico", price: 450 }
];
