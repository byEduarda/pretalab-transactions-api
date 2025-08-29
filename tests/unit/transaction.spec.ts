import * as transactionService from "../../src/services/transactionService";
import { transactions, Transaction } from "../../src/models/transactionModel";

describe("transactionService", () => {
  beforeEach(() => {
    transactions.length = 0;
    transactions.push(
      {
        id: "1",
        date: "2024-07-15T10:00:00Z",
        description: "Salário de Julho",
        amount: 5000,
        type: "income",
        category: "Salário",
      },
      {
        id: "2",
        date: "2024-07-15T12:30:00Z",
        description: "Aluguel",
        amount: 1500,
        type: "expense",
        category: "Moradia",
      }
    );
  });

  it("deve retornar todas as transações", () => {
    const result = transactionService.getAllTransactions();
    expect(result).toHaveLength(2);
  });

  it("deve filtrar transações por tipo", () => {
    const result = transactionService.getAllTransactions({ type: "income" });
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("income");
  });

  it("deve filtrar transações por categoria", () => {
    const result = transactionService.getAllTransactions({ category: "Moradia" });
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe("Moradia");
  });

  it("deve filtrar transações por intervalo de datas", () => {
    const result = transactionService.getAllTransactions({
      startDate: "2024-07-15T11:00:00Z",
      endDate: "2024-07-15T13:00:00Z",
    });
    expect(result).toHaveLength(1);
    expect(result[0].description).toBe("Aluguel");
  });

  it("deve filtrar transações por valores mínimos e máximos", () => {
    const result = transactionService.getAllTransactions({
      minAmount: 2000,
      maxAmount: 6000,
    });
    expect(result).toHaveLength(1);
    expect(result[0].description).toBe("Salário de Julho");
  });

  it("deve buscar transação por ID", () => {
    const result = transactionService.getTransactionById("1");
    expect(result).toBeDefined();
    expect(result?.id).toBe("1");
  });

  it("deve criar uma nova transação", () => {
    const newTransaction: Transaction = {
      id: "3",
      date: "2024-07-20T09:00:00Z",
      description: "Compra Mercado",
      amount: 300,
      type: "expense",
      category: "Alimentação",
    };

    const saved = transactionService.createTransaction(newTransaction);

    expect(saved).toEqual(newTransaction);
    expect(transactions).toHaveLength(3);
  });
});
