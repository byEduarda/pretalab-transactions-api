import request from "supertest";
import app from "../../src/app";

describe("Integration: Checkout", () => {
  it("POST /api/checkout deve criar nova compra com sucesso", async () => {
    const newPurchase = {
      cart: [
        { productId: "1", quantity: 1 },
        { productId: "2", quantity: 2 },
      ],
      total: 8200,
    };

    const res = await request(app).post("/api/checkout").send(newPurchase);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      message: "Compra processada com sucesso!",
      purchase: {
        cart: newPurchase.cart,
        total: newPurchase.total,
      },
    });
    expect(res.body.purchase.id).toBeDefined();
    expect(res.body.purchase.date).toBeDefined();
  });

  it("POST /api/checkout deve retornar 400 se total > 20000", async () => {
    const newPurchase = {
      cart: [
        { productId: "1", quantity: 3 },
        { productId: "2", quantity: 2 },
      ],
      total: 25000,
    };

    const res = await request(app).post("/api/checkout").send(newPurchase);

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      message: "O valor total da compra excede o limite de R$20.000.",
    });
  });

  it("POST /api/checkout deve retornar 400 se dados inválidos", async () => {
    const newPurchase = {
      cart: [
        { productId: "1", quantity: 0 },
      ],
      total: 0,
    };

    const res = await request(app).post("/api/checkout").send(newPurchase);

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      message: "Dados da compra inválidos.",
    });
  });

  it("POST /api/checkout deve retornar 400 se cart vazio", async () => {
    const newPurchase = {
      cart: [],
      total: 1000,
    };

    const res = await request(app).post("/api/checkout").send(newPurchase);

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      message: "Dados da compra inválidos.",
    });
  });
});
