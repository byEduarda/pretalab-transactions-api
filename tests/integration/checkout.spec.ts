import request from "supertest";
import app from "../../src/app";

describe("Integration: Checkout", () => {

  it("POST /checkout deve criar nova compra com sucesso", async () => {
    const newPurchase = {
      items: [
        { productId: "1", quantity: 1, price: 7500 },
        { productId: "2", quantity: 2, price: 350 },
      ],
    };

    const res = await request(app).post("/checkout").send(newPurchase);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      items: newPurchase.items,
      total: 8200, 
    });
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("date");
  });

  it("POST /checkout deve retornar 400 se o total exceder 20000", async () => {
    const newPurchase = {
      items: [
        { productId: "1", quantity: 3, price: 7500 }, 
      ],
    };

    const res = await request(app).post("/checkout").send(newPurchase);

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      message: "O valor total da compra excede o limite de R$20.000.",
    });
  });

});
