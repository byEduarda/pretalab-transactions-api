import request from "supertest";
import express from "express";
import transactionRoutes from "../../src/routes/transactionRoutes";

const app = express();
app.use(express.json());
app.use("/api/transactions", transactionRoutes);

describe("Integration: Transactions", () => {
  it("GET /api/transactions deve retornar todas as transações", async () => {
    const res = await request(app).get("/api/transactions");

    expect(res).toMatchObject({
      status: 200,
      body: expect.arrayContaining([
        expect.objectContaining({ id: expect.any(String), description: expect.any(String), amount: expect.any(Number) }),
      ]),
    });
  });

  it("GET /api/transactions/:id deve retornar uma transação específica", async () => {
    const res = await request(app).get("/api/transactions/1");

    expect(res).toMatchObject({
      status: 200,
      body: { id: "1", description: "Salário de Julho" },
    });
  });

  it("POST /api/transactions deve criar uma nova transação", async () => {
    const newTransaction = {
      description: "Teste",
      amount: 200,
      type: "expense",
      category: "Teste",
      date: new Date().toISOString(),
    };

    const res = await request(app).post("/api/transactions").send(newTransaction);

    expect(res).toMatchObject({
      status: 201,
      body: { description: "Teste", amount: 200, type: "expense", category: "Teste" },
    });
  });
});
