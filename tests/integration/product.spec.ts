import request from "supertest";
import mongoose from "mongoose";
import app from "../../src/app";
import ProductModel from "../../src/database/mongooseProduct";

describe("Integração das Rotas de Produtos", () => {
  it("deve retornar um produto por id", async () => {
    const productId = new mongoose.Types.ObjectId();
    const product = await ProductModel.create({
      _id: productId,
      name: "Notebook Gamer",
      price: 5000
    });

    const res = await request(app).get(`/api/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(productId.toHexString());
  });
});
