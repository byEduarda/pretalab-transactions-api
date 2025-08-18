import { transactionById } from "../../src/service/transactions"; 
import { Transaction } from "../../src/data"; 
describe("Testes Unitários — Transações", () => {
  it("deve retornar a transação correta pelo ID", async () => {
    const idFalso = "123";
    const transacaoFalsa: Transaction = {
      id: idFalso,
      date: "2024-08-18T10:00:00Z",
      description: "Teste de mock",
      amount: 500,
      type: "income",
      category: "Teste",
    };

    jest
      .spyOn(require("../../src/services/transactionService"), "transactionById")
      .mockResolvedValueOnce(transacaoFalsa);

    const resultado = await transactionById(idFalso);

    expect(resultado).toEqual(transacaoFalsa);
  });

  it("deve retornar null se a transação não for encontrada", async () => {
    jest
      .spyOn(require("../../src/services/transactionService"), "transactionById")
      .mockResolvedValueOnce(null);

    const resultado = await transactionById("999");

    expect(resultado).toBeNull();
  });
});
