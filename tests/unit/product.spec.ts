import { getAllProducts, getProductById } from "../../src/services/productService";
import { products } from "../../src/models/productModel";

describe("Prodruct Service Unit Tests", () => {
  it("deve mostrar todos os produtos", async () => {
    const all = await getAllProducts();
    expect(all).toMatchObject(products);
  });

  it("deve retornar um produto por id", async () => {
    const prod = await getProductById("1");
    expect(prod).toMatchObject({ id: "1", name: "Notebook Gamer Pro", price: 7500 });
  });

  it("deve retornar nulo para produto inexistente", async () => {
    const prod = await getProductById("999");
    expect(prod).toBeNull();
  });
});
