import { getProducts } from "./finshoppingService";

(async () => {
  console.log("🔹 Obtendo produtos do FinShopping...");
  const produtos = await getProducts();
  console.log(produtos);

})();
