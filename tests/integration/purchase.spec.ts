import request from "supertest";
import app from "../../src/app";
import { connectDB, disconnectDB } from "../setup";
import PurchaseModel from "../../src/database/mongoosePurchases";

beforeAll(async () => await connectDB());
afterAll(async () => await disconnectDB());
beforeEach(async () => await PurchaseModel.deleteMany({}));

describe("Purchases API", () => {
  it("deve criar uma nova compra com sucesso", async () => {
    const purchaseData = { items: ["Produto 1"], total: 100 };
    const res = await request(app).post("/api/purchases").send(purchaseData);
    expect(res.status).toBe(201);
    expect(res.body.total).toBe(100);
  });

  it("deve retornar 400 se o total da compra exceder o limite", async () => {
    const purchaseData = { items: ["Produto 1"], total: 1500 };
    const res = await request(app).post("/api/purchases").send(purchaseData);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Total excede limite");
  });
});
