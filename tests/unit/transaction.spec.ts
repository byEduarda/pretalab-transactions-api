import { transactionById  } from "../../src/service/transactions";

describe("Testes Unitários — Transações", () => {
  it("deve retornar a transação correta pelo ID", async () => {
    const idFalso = "123";
    const transacaoFalsa = { id: idFalso, valor: 500, tipo: "entrada" };
    
    jest.spyOn(require("../../src/services/transactionService"), "transactionById")
      .mockResolvedValueOnce(transacaoFalsa);

    const resultado = await transactionById (idFalso);

    expect(resultado).toEqual(transacaoFalsa);
  });

  it("deve retornar null se a transação não for encontrada", async () => {
    jest.spyOn(require("../../src/services/transactionService"), "transactionById ")
      .mockResolvedValueOnce(null);

    const resultado = await transactionById ("999");

    expect(resultado).toBeNull();
  });
});
