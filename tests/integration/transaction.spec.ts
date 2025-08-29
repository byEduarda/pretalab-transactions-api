import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../src/app";
import { Transaction } from "../../src/database/mongooseTransaction";

let mongoServer: MongoMemoryServer;
let SALARIO_ID: mongoose.Types.ObjectId;
let ALUGUEL_ID: mongoose.Types.ObjectId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
}, 20000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Transaction.deleteMany({});

  const transactions = await Transaction.create([
    { description: "Salário", amount: 5000, type: "income", category: "Salário", date: new Date() },
    { description: "Aluguel", amount: 1500, type: "expense", category: "Moradia", date: new Date() }
  ]);

  SALARIO_ID = transactions.find(t => t.description === "Salário")?._id as mongoose.Types.ObjectId;
  ALUGUEL_ID = transactions.find(t => t.description === "Aluguel")?._id as mongoose.Types.ObjectId;
});

describe("API de Transações Financeiras - Integração", () => {
  it("GET /api/transactions deve retornar todas as transações em ordem consistente", async () => {
    const res = await request(app).get("/api/transactions");

    const expected = [
      { _id: SALARIO_ID.toHexString(), description: "Salário", amount: 5000, type: "income", category: "Salário" },
      { _id: ALUGUEL_ID.toHexString(), description: "Aluguel", amount: 1500, type: "expense", category: "Moradia" }
    ];

    const sortedResBody = res.body.sort((a: any, b: any) => a.description.localeCompare(b.description));
    const sortedExpected = expected.sort((a, b) => a.description.localeCompare(b.description));

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(sortedResBody).toMatchObject(sortedExpected);
  });

  it("GET /api/transactions/:id deve retornar transação específica", async () => {
    const res = await request(app).get(`/api/transactions/${SALARIO_ID.toHexString()}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      _id: SALARIO_ID.toHexString(),
      description: "Salário",
      amount: 5000,
      type: "income",
      category: "Salário"
    });
  });

  it("GET /api/transactions/:id deve retornar 404 para ID inexistente", async () => {
    const res = await request(app).get("/api/transactions/64f000000000000000000999");
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ message: "Transação não encontrada." });
  });

  it("POST /api/transactions deve criar nova transação", async () => {
    const newTransaction = {
      description: "Conta de Internet",
      amount: 99.9,
      type: "expense" as const,
      category: "Contas",
      date: new Date().toISOString()
    };

    const res = await request(app).post("/api/transactions").send(newTransaction);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newTransaction);
  });

  it("GET /api/transactions com filtro deve retornar somente transações filtradas", async () => {
    const res = await request(app).get("/api/transactions?type=income");

    expect(res.status).toBe(200);
    expect(res.body.every((t: any) => t.type === "income")).toBe(true);
  });
});