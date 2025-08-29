import request from "supertest";
import app from "../../src/app";
import { transactions } from "../../src/models/transactionModel";

describe("Integration: Transactions API", () => {
  beforeEach(() => {
    transactions.length = 0;
    transactions.push(
      {
        id: "1",
        date: "2024-07-15T10:00:00Z",
        description: "Salário de Julho",
        amount: 5000,
        type: "income",
        category: "Salário",
      },
      {
        id: "2",
        date: "2024-07-15T12:30:00Z",
        description: "Aluguel",
        amount: 1500,
        type: "expense",
        category: "Moradia",
      }
    );
  });

  it("GET /transactions deve retornar todas as transações", async () => {
    const res = await request(app).get("/transactions");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it("GET /transactions com filtro de tipo deve retornar apenas incomes", async () => {
    const res = await request(app).get("/transactions?type=income");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].type).toBe("income");
  });

  it("GET /transactions com filtro de categoria deve retornar apenas Moradia", async () => {
    const res = await request(app).get("/transactions?category=Moradia");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].category).toBe("Moradia");
  });

  it("GET /transactions/:id deve retornar uma transação existente", async () => {
    const res = await request(app).get("/transactions/1");
    expect(res.status).toBe(200);
    expect(res.body.id).toBe("1");
  });

  it("GET /transactions/:id deve retornar 404 se não encontrada", async () => {
    const res = await request(app).get("/transactions/999");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Transação não encontrada.");
  });

  it("POST /transactions deve criar uma nova transação", async () => {
    const newTransaction = {
      date: "2024-07-20T09:00:00Z",
      description: "Mercado",
      amount: 300,
      type: "expense",
      category: "Alimentação",
    };

    const res = await request(app).post("/transactions").send(newTransaction);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newTransaction);
  });
});
