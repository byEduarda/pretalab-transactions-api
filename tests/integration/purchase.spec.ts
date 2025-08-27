import request from "supertest";
import app from "../../src/app";

describe("Integration: Purchases / Checkout", () => {
  it("GET /purchases deve retornar todas as compras", async () => {
    const res = await request(app).get("/purchases");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          total: expect.any(Number),
          items: expect.any(Array),
        }),
      ])
    );
  });

  it("GET /purchases/:id deve retornar compra específica", async () => {
    const res = await request(app).get("/purchases/1");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: "1",
      total: expect.any(Number),
      items: expect.any(Array),
    });
  });

  it("GET /purchases/:id deve retornar 404 para compra inexistente", async () => {
    const res = await request(app).get("/purchases/999");
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ message: "Compra não encontrada" });
  });

  it("POST /checkout deve criar nova compra", async () => {
    const newPurchase = {
      total: 8200,
      items: [
        { productId: "1", quantity: 1, name: "Notebook Gamer Pro", price: 7500 },
        { productId: "2", quantity: 1, name: "Mouse Gamer", price: 700 }
      ]
    };
    const res = await request(app).post("/checkout").send(newPurchase);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newPurchase);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("date");
  });

  it("POST /checkout deve retornar 400 se total > 20000", async () => {
    const newPurchase = {
      total: 25000,
      items: [{ productId: "1", quantity: 5, name: "Notebook Gamer Pro", price: 5000 }]
    };
    const res = await request(app).post("/checkout").send(newPurchase);
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({ message: "O valor total da compra excede o limite de R$20.000." });
  });
});
