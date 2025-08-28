import { getProducts } from "../../src/externalAPI/finshoppingService";

describe("getProducts - Integration Test", () => {
  it("deve retornar produtos reais da API do FinShopping", async () => {
    const produtos = await getProducts();

    expect(Array.isArray(produtos)).toBe(true);

    if (produtos.length > 0) {
      expect(produtos[0]).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        price: expect.any(Number),
      });
    }
  });
});
