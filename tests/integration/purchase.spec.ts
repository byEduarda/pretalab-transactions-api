import request from "supertest";
import express from "express";
import purchaseRoutes from "../../src/routes/purchaseRoutes";

const app = express();
app.use(express.json());
app.use("/api/purchases", purchaseRoutes);

describe("Integration: Purchases / Checkout", () => {

  it("POST /api/purchases/checkout deve criar uma compra", async () => {
    const cart = [
      { productId: "1", quantity: 1 },
      { productId: "2", quantity: 2 },
    ];
    const total = 8200;

    const res = await request(app)
      .post("/api/purchases/checkout")
      .send({ cart, total });

    expect(res).toMatchObject({
      status: 201,
      body: {
        total,
        items: expect.arrayContaining([
          expect.objectContaining({ productId: "1", quantity: 1, name: expect.any(String), price: expect.any(Number) }),
          expect.objectContaining({ productId: "2", quantity: 2, name: expect.any(String), price: expect.any(Number) }),
        ]),
      },
    });
  });

  it("GET /api/purchases deve retornar todas as compras", async () => {
    const res = await request(app).get("/api/purchases");

    expect(res).toMatchObject({
      status: 200,
      body: expect.arrayContaining([
        expect.objectContaining({ id: expect.any(String), total: expect.any(Number), items: expect.any(Array) }),
      ]),
    });
  });

  it("GET /api/purchases/:id deve retornar compra específica", async () => {
    const purchaseRes = await request(app)
      .post("/api/purchases/checkout")
      .send({ cart: [{ productId: "1", quantity: 1 }], total: 7500 });

    const { id } = purchaseRes.body;
    const res = await request(app).get(`/api/purchases/${id}`);

    expect(res).toMatchObject({
      status: 200,
      body: { id, total: 7500 },
    });
  });

  it("POST /api/purchases/checkout deve retornar erro se total > 20000", async () => {
    const res = await request(app)
      .post("/api/purchases/checkout")
      .send({ cart: [{ productId: "1", quantity: 10 }], total: 25000 });

    expect(res).toMatchObject({
      status: 400,
      body: { message: "O valor total da compra excede o limite de R$20.000." },
    });
  });

});
