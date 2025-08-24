import { products, Product } from "../models/productModel";

export const getAllProducts = (): Product[] => products;

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id.toString === id.toString);

export const createProduct = (product: Product): Product => {
  products.push(product);
  return product;
};
