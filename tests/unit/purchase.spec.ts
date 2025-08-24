import { createPurchase, getAllPurchases, getPurchaseById } from "../../src/services/purchaseService";
import { purchases } from "../../src/models/purchaseModel";

describe("Unit: Purchases", () => {
  it("deve criar uma nova compra", () => {
    const cart = [
      { productId: "1", quantity: 1 },
      { productId: "2", quantity: 2 },
    ];
    const total = 8200;
    const result = createPurchase(cart, total);
    expect(result).toMatchObject({
      total,
      items: [
        { productId: "1", quantity: 1, name: expect.any(String), price: expect.any(Number) },
        { productId: "2", quantity: 2, name: expect.any(String), price: expect.any(Number) },
      ],
    });
  });

  it("deve retornar todas as compras", () => {
    const result = getAllPurchases();
    expect(result).toMatchObject(purchases);
  });

  it("deve retornar compra específica pelo id", () => {
    const purchase = createPurchase([{ productId: "1", quantity: 1 }], 7500);
    const result = getPurchaseById(purchase.id);
    expect(result).toMatchObject({ id: purchase.id, total: 7500 });
  });

  it("deve lançar erro se total exceder 20.000", () => {
    expect(() => createPurchase([{ productId: "1", quantity: 10 }], 25000))
      .toThrow("O valor total da compra excede o limite de R$20.000.");
  });

  it("deve lançar erro se dados forem inválidos", () => {
    expect(() => createPurchase([], 0))
      .toThrow("Dados da compra inválidos.");
  });
});
