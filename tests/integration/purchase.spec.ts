import request from "supertest";
import mongoose from "mongoose";
import app from "../../src/app";
import PurchaseModel from "../../src/database/mongoosePurchases";

describe("Integração das Rotas de Compras", () => {
  it("deve criar uma nova compra com sucesso", async () => {
    const purchaseData = {
      items: [{ productId: new mongoose.Types.ObjectId(), quantity: 1 }],
      total: 100
    };

    const res = await request(app).post("/api/purchases").send(purchaseData);
    expect(res.status).toBe(201);
    expect(res.body.total).toBe(100);

    const saved = await PurchaseModel.findById(res.body._id);
    expect(saved).not.toBeNull();
  });

  it("deve retornar 400 se o total da compra exceder o limite", async () => {
    const purchaseData = {
      items: [{ productId: new mongoose.Types.ObjectId(), quantity: 1 }],
      total: 1000000
    };

    const res = await request(app).post("/api/purchases").send(purchaseData);
    expect(res.status).toBe(400);
  });
});
