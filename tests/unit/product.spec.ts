import { getAllProducts, getProductById, createProduct } from "../../src/services/productService";
import { products } from "../../src/models/productModel";

describe("Unit: Products", () => {
  it("deve retornar todos os produtos", () => {
    const result = getAllProducts();
    expect(result).toMatchObject(products);
  });

  it("deve retornar produto específico pelo id", () => {
    const product = getProductById("1");
    expect(product).toMatchObject({ id: "1", name: "Notebook Gamer Pro" });
  });

  it("deve criar um novo produto", () => {
    const newProduct = { id: "9999", name: "Teste", price: 100 };
    const result = createProduct(newProduct);
    expect(result).toMatchObject(newProduct);
  });
});
