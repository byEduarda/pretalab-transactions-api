import { getAllTransactions, getTransactionById, createTransaction } from "../../src/services/transactionService";
import { transactions } from "../../src/models/transactionModel";

describe("Unit: Transactions", () => {
  it("deve retornar todas as transações", () => {
    const result = getAllTransactions();
    expect(result).toMatchObject(transactions);
  });

  it("deve retornar transação específica pelo id", () => {
    const transaction = getTransactionById("1");
    expect(transaction).toMatchObject({ id: "1", description: "Salário de Julho" });
  });

  it("deve criar uma nova transação", () => {
    const newTransaction = {
      id: "999",
      description: "Teste",
      amount: 100,
      type: "income" as const,
      category: "Teste",
      date: new Date().toISOString(),
    };
    const result = createTransaction(newTransaction);
    expect(result).toMatchObject(newTransaction);
  });
});