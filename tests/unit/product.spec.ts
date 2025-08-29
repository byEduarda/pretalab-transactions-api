import { getAllProducts, getProductById } from "../../src/services/productService";
import { products } from "../../src/models/productModel";

describe("Product Service Unit Tests", () => {
  it("should return all products", async () => {
    const all = await getAllProducts();
    expect(all).toMatchObject(products);
  });

  it("should return a product by id", async () => {
    const prod = await getProductById("1");
    expect(prod).toMatchObject({ id: "1", name: "Notebook Gamer Pro", price: 7500 });
  });

  it("should return null for non-existing product", async () => {
    const prod = await getProductById("999");
    expect(prod).toBeNull();
  });
});
