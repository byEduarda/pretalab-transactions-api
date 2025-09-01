import TransactionModel, { Transaction } from "../../src/database/mongooseTransaction";
import { createTransaction } from "../../src/services/transactionService";
import { jest } from "@jest/globals";

// Mock do Mongoose
jest.mock("../../src/models/transactionModel");

// Tipando o mock
const mockedTransactionModel = TransactionModel as jest.Mocked<typeof TransactionModel>;

describe("Testes de Unidade do Serviço de Transações", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar uma nova transação", async () => {
    const mockTransaction: Omit<Transaction, "_id" | "__v"> = {
      amount: 100,
      category: "Alimentação",
      date: new Date().toISOString(),
      description: "Teste",
      type: "expense",
    };

    // Mockando create do Mongoose com tipagem correta
    mockedTransactionModel.create.mockResolvedValue(mockTransaction as Transaction);

    const result = await createTransaction(mockTransaction);

    expect(result).toEqual(mockTransaction);
    expect(mockedTransactionModel.create).toHaveBeenCalledWith(mockTransaction);
  });
});
