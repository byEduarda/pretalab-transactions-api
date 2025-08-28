import request from "supertest";
import app from "../../src/app";

describe("Integration: Checkout", () => {
  it("POST /checkout deve criar uma nova compra com sucesso", async () => {
    const newPurchase = {
      total: 8200,
      items: [
        { productId: "1", quantity: 1, name: "Notebook Gamer Pro", price: 7500 },
        { productId: "2", quantity: 1, name: "Mouse Gamer", price: 700 },
      ],
    };

    const res = await request(app).post("/checkout").send(newPurchase);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      total: newPurchase.total,
      items: newPurchase.items,
    });
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("date");
  });

  it("POST /checkout deve retornar 400 se o total exceder 20000", async () => {
    const invalidPurchase = {
      total: 25000,
      items: [{ productId: "1", quantity: 5, name: "Notebook Gamer Pro", price: 5000 }],
    };

    const res = await request(app).post("/checkout").send(invalidPurchase);

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      message: "O valor total da compra excede o limite de R$20.000.",
    });
  });
});
