import { TransactionService, TransactionInput } from "../../src/services/transactionService";
import { Transaction } from "../../src/database/mongooseTransaction";

jest.mock("../../src/database/mongooseTransaction");

describe("TransactionService - Unitário", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve buscar todas as transações", async () => {
    const mockData = [
      { id: "1", description: "Salário", amount: 5000, type: "income", category: "Salário", date: new Date() },
      { id: "2", description: "Aluguel", amount: 1500, type: "expense", category: "Moradia", date: new Date() }
    ];

    (Transaction.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockData)
    });

    const result = await TransactionService.getTransactions({});
    expect(result).toMatchObject(mockData);
  });

  it("deve buscar transação por id", async () => {
    const mockData = { id: "1", description: "Salário", amount: 5000, type: "income", category: "Salário", date: new Date() };
    (Transaction.findById as jest.Mock).mockResolvedValue(mockData);

    const result = await TransactionService.getTransactionById("1");
    expect(result).toMatchObject(mockData);
  });

  it("deve criar transação", async () => {
    const input: TransactionInput = {
      description: "Conta de Internet",
      amount: 99.9,
      type: "expense",
      category: "Contas",
      date: new Date().toISOString(),
    };

    const savedData = { id: "11", ...input };
    (Transaction.prototype.save as jest.Mock).mockResolvedValue(savedData);

    const result = await TransactionService.createTransaction(input);
    expect(result).toMatchObject(savedData);
  });
});
