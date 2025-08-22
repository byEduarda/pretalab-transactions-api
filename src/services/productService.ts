import { products, Product } from "../models/productModel";

export const getAllProducts = (): Product[] => products;

export const getProductById = (id: number): Product | undefined =>
  products.find((p) => p.id === id);

export const createProduct = (product: Product): Product => {
  products.push(product);
  return product;
};
