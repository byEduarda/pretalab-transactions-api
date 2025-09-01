import request from "supertest";
import app from "../../src/app";
import { connectDB, disconnectDB } from "../setup";
import ProductModel from "../../src/database/mongooseProduct";

beforeAll(async () => await connectDB());
afterAll(async () => await disconnectDB());
beforeEach(async () => await ProductModel.deleteMany({}));

describe("Products API", () => {
  it("GET /api/products deve retornar lista vazia inicialmente", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /api/products deve criar um produto", async () => {
    const product = { name: "Notebook Gamer", price: 7500 };
    const res = await request(app).post("/api/products").send(product);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(product);
  });

  it("GET /api/products/:id deve retornar um produto por id", async () => {
    const product = await ProductModel.create({ name: "Mouse", price: 300 });
    const res = await request(app).get(`/api/products/${product._id}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ name: "Mouse", price: 300 });
  });
});
