import request from "supertest";
import app from "../../src/app";

describe("Integration: Transactions", () => {
  it("GET /transactions deve retornar todas as transações", async () => {
    const res = await request(app).get("/transactions");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ 
          id: expect.any(String),
          date: expect.any(String),
          description: expect.any(String), 
          amount: expect.any(Number), 
          type: expect.any(String), 
          category: expect.any(String) }),
      ])
    );
  });

  it("GET /transactions/:id deve retornar transação específica", async () => {
    const res = await request(app).get("/transactions/1");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: "1", description: "Salário de Julho" });
  });

  it("GET /transactions/:id deve retornar 404 para transação inexistente", async () => {
    const res = await request(app).get("/transactions/999");
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ message: "Transação não encontrada" });
  });

  it("POST /transactions deve criar nova transação", async () => {
    const newTransaction = {
      description: "Conta de Internet",
      amount: 99.9,
      type: "expense",
      category: "Contas"
    };
    const res = await request(app).post("/transactions").send(newTransaction);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newTransaction);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("date");
  });
});
