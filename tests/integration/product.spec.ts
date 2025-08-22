import request from "supertest";
import express from "express";
import productRoutes from "../../src/routes/productRoutes";

const app = express();
app.use(express.json());
app.use("/api/products", productRoutes);

describe("Integration: Products", () => {
  it("GET /api/products deve retornar todos os produtos", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toMatchObject({ id: expect.any(Number), name: expect.any(String), price: expect.any(Number) });
  });

  it("GET /api/products/:id deve retornar um produto específico", async () => {
    const res = await request(app).get("/api/products/1");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 1, name: "Notebook Gamer Pro" });
  });

  it("POST /api/products deve criar um novo produto", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({ id: 1234, name: "Produto Teste", price: 500 });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 1234, name: "Produto Teste", price: 500 });
  });
});
