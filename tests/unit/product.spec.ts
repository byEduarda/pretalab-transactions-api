import { getAllProducts, getProductById } from "../../src/services/productService";
import { products } from "../../src/models/productModel";

describe("Product Service Unit Tests", () => {
  it("should return all products", () => {
    const all = getAllProducts();
    expect(all).toMatchObject(products);
  });

  it("should return a product by id", () => {
    const prod = getProductById("1");
    expect(prod).toMatchObject({ id: "1", name: "Notebook Gamer Pro", price: 7500 });
  });
});
