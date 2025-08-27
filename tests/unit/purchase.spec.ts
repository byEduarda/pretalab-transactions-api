import { createPurchase, getPurchaseById, getAllPurchases } from "../../src/services/purchaseService";
import { Purchase } from "../../src/models/purchaseModel";

describe("Purchase Service - Unit Tests", () => {
  it("deve criar uma nova compra", () => {
    const items = [
      { productId: "1", quantity: 1, name: "Notebook Gamer Pro", price: 7500 },
    ];
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const newPurchase = createPurchase({ items, total });

    expect(newPurchase).not.toBeNull();
    expect(newPurchase!).toMatchObject({
      items,
      total,
    });

    expect(newPurchase!.id).toBeDefined();
    expect(newPurchase!.date).toBeDefined();
  });

  it("deve retornar todas as compras", () => {
    const purchases = getAllPurchases();
    expect(purchases).toBeInstanceOf(Array);
    purchases.forEach((p) => expect(p).toMatchObject({ id: expect.any(String), items: expect.any(Array), total: expect.any(Number), date: expect.any(String) }));
  });

  it("deve retornar uma compra específica pelo ID", () => {
    const items = [
      { productId: "1", quantity: 1, name: "Notebook Gamer Pro", price: 7500 },
    ];
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const purchase = createPurchase({ items, total });

    const foundPurchase = getPurchaseById(purchase!.id);

    expect(foundPurchase).not.toBeNull();
    expect(foundPurchase!).toMatchObject({
      id: purchase!.id,
      items,
      total,
    });
  });
});
