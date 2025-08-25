import request from "supertest";
import express from "express";
import productRoutes from "../../src/routes/productRoutes";

const app = express();
app.use(express.json());
app.use("/api/products", productRoutes);

describe("Integration: Products", () => {

  it("GET /api/products deve retornar todos os produtos", async () => {
    const res = await request(app).get("/api/products");

    expect(res).toMatchObject({
      status: 200,
      body: expect.arrayContaining([
        expect.objectContaining({ id: expect.any(String), name: expect.any(String), price: expect.any(Number) }),
      ]),
    });
  });

  it("GET /api/products/:id deve retornar um produto específico", async () => {
    const res = await request(app).get("/api/products/1");

    expect(res).toMatchObject({
      status: 200,
      body: { id: "1", name: "Notebook Gamer Pro" },
    });
  });

});
