import { processCheckout, CartItem } from "../../src/services/checkoutService";

describe("Unit: checkoutService.processCheckout", () => {
  it("deve processar compra com sucesso", () => {
    const cart: CartItem[] = [
      { productId: "1", quantity: 1 },
      { productId: "2", quantity: 2 },
    ];
    const total = 8200;

    const result = processCheckout(cart, total);

    expect(result).toMatchObject({
      cart,
      total,
    });
    expect(result.id).toBeDefined();
    expect(result.date).toBeDefined();
  });

  it("deve lançar erro se total > 20000", () => {
    const cart: CartItem[] = [
      { productId: "1", quantity: 3 },
      { productId: "2", quantity: 2 },
    ];
    const total = 25000;

    expect(() => processCheckout(cart, total)).toThrow(
      "O valor total da compra excede o limite de R$20.000."
    );
  });

  it("deve lançar erro se dados inválidos", () => {
    const invalidCart: any = [
      { productId: 1, quantity: 0 }, 
    ];
    const total = 0;

    expect(() => processCheckout(invalidCart, total)).toThrow(
      "Dados da compra inválidos."
    );
  });

  it("deve lançar erro se cart vazio", () => {
    const emptyCart: CartItem[] = [];
    const total = 1000;

    expect(() => processCheckout(emptyCart, total)).toThrow(
      "Dados da compra inválidos."
    );
  });
});
