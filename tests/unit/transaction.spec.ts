import { getAllTransactions, getTransactionById, createTransaction } from "../../src/services/transactionService";
import { transactions } from "../../src/models/transactionModel";

describe("Transaction Service Unit Tests", () => {
  beforeEach(() => {
    transactions.length = 0; 
  });

  it("should return all transactions", () => {
    const trans = createTransaction({ description: "Teste", amount: 100, type: "expense", category: "Contas" });
    const all = getAllTransactions();
    expect(all).toMatchObject([trans]);
  });

  it("should return a transaction by id", () => {
    const trans = createTransaction({ description: "Teste", amount: 100, type: "expense", category: "Contas" });
    const found = getTransactionById(trans.id);
    expect(found).toMatchObject(trans);
  });

  it("should create a new transaction", () => {
    const newTrans = createTransaction({ description: "Nova", amount: 200, type: "income", category: "Salário" });
    expect(newTrans).toMatchObject({ description: "Nova", amount: 200, type: "income", category: "Salário" });
    expect(transactions).toMatchObject([newTrans]);
  });
});
