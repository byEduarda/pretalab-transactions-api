import * as transactionService from '../../src/services/transactionService';
import TransactionModel from '../../src/database/mongooseTransaction';

jest.mock('../../../database/mongooseTransaction');

describe('Testes de Unidade do Serviço de Transações', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma nova transação', async () => {
    const mockTransactionData = { description: 'Teste', amount: 100, type: 'income', category: 'Outros', date: '2025-01-01' };
    const mockSavedTransaction = { _id: 'mockId', ...mockTransactionData };

    (TransactionModel.prototype.save as jest.Mock).mockResolvedValue(mockSavedTransaction);

    const result = await transactionService.createTransaction(mockTransactionData);
    
    expect(result).toEqual(mockSavedTransaction);
    expect(TransactionModel.prototype.save).toHaveBeenCalledTimes(1);
  });

  it('deve obter todas as transações', async () => {
    const mockTransactions = [{ description: 'Salario', amount: 5000, type: 'income' }];
    (TransactionModel.find as jest.Mock).mockResolvedValue(mockTransactions);

    const result = await transactionService.getAllTransactions({});

    expect(TransactionModel.find).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockTransactions);
  });

  it('deve obter uma transação por ID', async () => {
    const mockTransaction = { _id: '1', description: 'Aluguel', amount: 1500 };
    (TransactionModel.findById as jest.Mock).mockResolvedValue(mockTransaction);

    const result = await transactionService.getTransactionById('1');

    expect(TransactionModel.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockTransaction);
  });
});