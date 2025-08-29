import request from "supertest";
import app from "../../src/app";

describe("Integration: Checkout", () => {
  
  it("POST /checkout deve criar nova compra com sucesso", async () => {
    const newPurchase = {
      cart: [
        { productId: "1", quantity: 1 },
        { productId: "2", quantity: 2 },
      ],
      total: 8200
    };

    const res = await request(app).post("/checkout").send(newPurchase);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      message: "Compra processada com sucesso!"
    });
  });

  it("POST /checkout deve retornar 400 se o total exceder 20000", async () => {
    const newPurchase = {
      cart: [
        { productId: "1", quantity: 3 }, 
      ],
      total: 22500
    };

    const res = await request(app).post("/checkout").send(newPurchase);

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      message: "O valor total da compra excede o limite de R$20.000."
    });
  });

  it("POST /checkout deve retornar 400 se os dados forem inválidos", async () => {
    const invalidPurchase = {
      cart: [
        { productId: "1", quantity: 0 }, 
      ],
      total: 0
    };

    const res = await request(app).post("/checkout").send(invalidPurchase);

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      message: "Dados da compra inválidos."
    });
  });

});
