import { getProducts } from "../../src/externalAPI/finshoppingService";

describe("Testando API externa", () => {
  it("deve retornar produtos da API", async () => {
    const products = await getProducts();
    
    console.log("Produtos recebidos:", products);

    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
  });
});
