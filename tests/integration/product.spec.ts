import request from "supertest";
import app from "../../src/app";

describe("Integration: Products", () => {
  it("GET /products deve retornar todos os produtos", async () => {
    const res = await request(app).get("/products");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          price: expect.any(Number),
        }),
      ])
    );
  });

  it("GET /products/:id deve retornar produto específico", async () => {
    const res = await request(app).get("/products/1");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: "1",
      name: "Notebook Gamer Pro",
      price: 7500,
    });
  });

  it("GET /products/:id deve retornar 404 para produto inexistente", async () => {
    const res = await request(app).get("/products/999");
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ message: "Produto não encontrado" });
  });
});
