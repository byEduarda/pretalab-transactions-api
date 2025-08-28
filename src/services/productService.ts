import { Product, products } from "../models/productModel";

export const getAllProducts = (): Product[] => products;

export const getProductById = (id: string): Product | undefined =>
  products.find(p => p.id === id);
