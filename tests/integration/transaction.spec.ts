import request from "supertest";
import app from "../../src/app";
import { connectDB, disconnectDB } from "../setup";
import { TransactionModel } from "../../src/database/mongooseTransaction";
import mongoose from "mongoose";

beforeAll(async () => await connectDB());
afterAll(async () => await disconnectDB());
beforeEach(async () => await TransactionModel.deleteMany({}));

describe("Transactions API", () => {
  it("GET /api/transactions deve retornar lista vazia inicialmente", async () => {
    const res = await request(app).get("/api/transactions");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /api/transactions deve criar uma transação", async () => {
    const transaction = {
      description: "Internet",
      amount: 100,
      type: "expense",
      category: "Contas",
      date: new Date().toISOString(),
    };

    const res = await request(app).post("/api/transactions").send(transaction);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      description: "Internet",
      amount: 100,
      type: "expense",
      category: "Contas",
    });
  });

  it("GET /api/transactions/:id deve retornar a transação criada", async () => {
    const transaction = await TransactionModel.create({
      description: "Salário",
      amount: 5000,
      type: "income",
      category: "Salário",
      date: new Date(),
    });

    const res = await request(app).get(`/api/transactions/${transaction._id}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      description: "Salário",
      amount: 5000,
      type: "income",
      category: "Salário",
    });
  });

  it("GET /api/transactions/:id deve retornar 404 se não existir", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/transactions/${fakeId}`);
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ message: "Transação não encontrada." });
  });
});
