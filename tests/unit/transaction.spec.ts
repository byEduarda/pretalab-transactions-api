import { TransactionModel } from "../../src/database/mongooseTransaction";
import * as transactionService from "../../src/services/transactionService";
import { connectDB, disconnectDB } from "../setup";

describe("Transaction Service - Unit Tests", () => {
  beforeAll(async () => {
    await connectDB();
    await TransactionModel.deleteMany({});
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it("deve criar uma nova transação", async () => {
    const data = {
      description: "Conta de Luz",
      amount: 150,
      type: "expense" as const,
      category: "Contas",
      date: new Date(),
    };
    const transaction = await transactionService.createTransaction(data);

    expect(transaction).toMatchObject({
      description: "Conta de Luz",
      amount: 150,
      type: "expense",
      category: "Contas",
    });
  });

  it("deve retornar uma transação pelo ID", async () => {
    const transaction = await TransactionModel.create({
      description: "Salário",
      amount: 5000,
      type: "income" as const,
      category: "Salário",
      date: new Date(),
    });

    const found = await transactionService.getTransactionById(transaction._id.toString());
    expect(found).toMatchObject({
      description: "Salário",
      amount: 5000,
      type: "income",
      category: "Salário",
    });
  });

  it("deve filtrar transações por tipo e categoria", async () => {
    await TransactionModel.create({
      description: "Aluguel",
      amount: 1200,
      type: "expense",
      category: "Moradia",
      date: new Date(),
    });

    const results = await transactionService.getAllTransactions({ type: "expense", category: "Moradia" });
    expect(results[0]).toMatchObject({
      type: "expense",
      category: "Moradia",
    });
  });
});
