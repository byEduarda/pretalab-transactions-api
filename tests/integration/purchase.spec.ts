import request from "supertest";
import app from "../../src/app";
import { purchases } from "../../src/models/purchaseModel";

describe("Integration: Purchases", () => {
  it("GET /purchases deve retornar todas as compras", async () => {
    const res = await request(app).get("/purchases");
    expect(res.status).toBe(200);
    expect(res.body.purchases).toEqual(
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
    const purchaseExistente = purchases[0];

    const res = await request(app).get(`/purchases/${purchaseExistente.id}`);
    expect(res.status).toBe(200);
    expect(res.body.purchase).toMatchObject({
      id: purchaseExistente.id,
      total: expect.any(Number),
      items: expect.any(Array),
    });
  });

  it("GET /purchases/:id deve retornar 404 para compra inexistente", async () => {
    const res = await request(app).get("/purchases/999");
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ message: "Compra não encontrada" });
  });
});
