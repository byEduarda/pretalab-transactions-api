import request from "supertest";
import app from "../../src/app";
import { connectDB, disconnectDB } from "../setup";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe("Integração da Rota de Sincronização", () => {
  it("deve sincronizar produtos e retornar sucesso", async () => {
    const res = await request(app).post("/api/sync-products");
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/sucesso/i);
  });
});
