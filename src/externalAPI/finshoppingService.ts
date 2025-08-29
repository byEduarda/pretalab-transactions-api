import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios.get("https://finshopping.vercel.app/api/products");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
};



