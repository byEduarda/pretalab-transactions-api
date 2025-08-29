import { Product, products } from "../models/productModel";

const API_URL = "https://finshopping.vercel.app/api/products"; 

export const getAllProducts = async (): Promise<Product[]> => {
  if (process.env.NODE_ENV === "test") {
    return products;
  }

  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Erro ao buscar produtos");

  return response.json();
};

export const getProductById = async (id: string): Promise<Product | null> => {
  if (process.env.NODE_ENV === "test") {
    return products.find((p) => p.id === id) || null;
  }

  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Erro ao buscar produtos");

  const allProducts: Product[] = await response.json();
  return allProducts.find((p) => p.id === id) || null;
};
