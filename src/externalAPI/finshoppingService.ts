import axios from "axios";

interface Product {
  id: string;
  name: string;
  price: number;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(
      'https://finshopping.vercel.app/api/products'
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
};

(async () => {
  const products = await getProducts();
  console.log("Resultado da API:", products);
})();
