import mongoose from "mongoose";
import request from "supertest";
import app from "../../src/app";
import dotenv from "dotenv"
dotenv.config();

beforeAll(async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI não está definido");
  await mongoose.connect(process.env.MONGO_URI!, { dbName: "test_db" });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Integração da Rota de Sincronização", () => {
  it("deve sincronizar produtos e retornar sucesso", async () => {
    const res = await request(app).post("/api/sync-products");
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/sucesso/i);
  });
});
