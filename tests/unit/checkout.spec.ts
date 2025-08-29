import * as checkoutService from "../../src/services/checkoutService";

describe("Unit: checkoutService.processCheckout", () => {

  it("deve processar uma nova compra com sucesso", async () => {
    const cart = [
      { productId: "1", quantity: 1 },
      { productId: "2", quantity: 2 },
    ];
    const total = 8200;

    const result = await checkoutService.processCheckout(cart, total);

    expect(result).toMatchObject({
      total,
      items: [
        { productId: "1", quantity: 1, price: 7500 },
        { productId: "2", quantity: 2, price: 350 },
      ],
    });
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("date");
  });

  it("deve lançar erro se o total exceder 20000", async () => {
    const cart = [
      { productId: "1", quantity: 3 }, 
    ];
    const total = 22500;

    await expect(checkoutService.processCheckout(cart, total))
      .rejects
      .toThrow("O valor total da compra excede o limite de R$20.000.");
  });

  it("deve lançar erro se os dados forem inválidos", async () => {
    const invalidCart = [
      { productId: "1", quantity: 0 }, 
    ];
    const total = 0;

    await expect(checkoutService.processCheckout(invalidCart, total))
      .rejects
      .toThrow("Dados da compra inválidos.");
  });

});
